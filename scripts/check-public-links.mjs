import fs from 'node:fs/promises'
import path from 'node:path'

const cwd = process.cwd()
const docsMode = await exists(path.join(cwd, 'docs', '.vitepress'))
const contentRoot = docsMode ? path.join(cwd, 'docs') : cwd
const checkExternal = process.argv.includes('--external')
const excluded = new Set(['.git', '.ai', 'node_modules', 'docs-blog', 'ops', 'scripts', 'dist', 'cache', '.cache'])
const extensions = new Set(['.md', '.html', '.htm', '.txt', '.xml', '.mjs', '.js'])
const legacyPatterns = [
  [/https:\/\/www\.cedar-v\.com/gi, '使用官网主域名 https://cedar-v.com/'],
  [/https?:\/\/api\.lm\.cedar-v\.com/gi, '旧 API 域名已停用，请使用 https://lic.cedar-v.com'],
  [/http:\/\/lm\.cedar-v\.com(?=[:/\s)'"]|$)/gi, '不得公开链接纯 HTTP 演示环境']
]
const errors = []
const warnings = []
const externalLinks = new Map()

async function exists(target) {
  try {
    await fs.access(target)
    return true
  } catch {
    return false
  }
}

async function walk(dir) {
  const files = []
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    if (excluded.has(entry.name)) continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) files.push(...await walk(full))
    else if (extensions.has(path.extname(entry.name).toLowerCase())) files.push(full)
  }
  return files
}

function lineOf(text, index) {
  return text.slice(0, index).split('\n').length
}

function cleanLink(raw) {
  return raw.trim().replace(/^<|>$/g, '').replace(/&amp;/g, '&')
}

function collectLinks(text) {
  const links = []
  const patterns = [
    /(?:href|src)\s*=\s*["']([^"']+)["']/gi,
    /!?\[[^\]]*\]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/g
  ]
  for (const pattern of patterns) {
    for (const match of text.matchAll(pattern)) {
      links.push({ url: cleanLink(match[1]), index: match.index ?? 0 })
    }
  }
  return links
}

function isIgnored(url) {
  return !url || url.startsWith('#') || /^(mailto:|tel:|javascript:|data:)/i.test(url) ||
    url.includes('{{') || url.includes('$' + '{')
}

function candidatesFor(sourceFile, rawUrl) {
  const value = rawUrl.split('#')[0].split('?')[0]
  let decoded
  try {
    decoded = decodeURIComponent(value)
  } catch {
    decoded = value
  }
  const relativeBase = decoded.startsWith('/') ? contentRoot : path.dirname(sourceFile)
  const relativePath = decoded.startsWith('/') ? decoded.slice(1) : decoded
  const base = path.resolve(relativeBase, relativePath)
  const candidates = [base]
  if (docsMode) {
    candidates.push(base + '.md', path.join(base, 'index.md'))
    if (base.endsWith('.html')) {
      const withoutHtml = base.slice(0, -5)
      candidates.push(withoutHtml + '.md', path.join(withoutHtml, 'index.md'))
    }
    if (decoded.startsWith('/')) candidates.push(path.join(contentRoot, 'public', relativePath))
  } else {
    candidates.push(path.join(base, 'index.html'))
  }
  return [...new Set(candidates)]
}

async function checkExternalUrl(url) {
  const acceptable = new Set([401, 403, 405])
  for (let attempt = 0; attempt < 2; attempt++) {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 12000)
    try {
      let response = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: controller.signal })
      if (response.status === 405) {
        response = await fetch(url, { method: 'GET', redirect: 'follow', signal: controller.signal })
      }
      if ((response.status >= 200 && response.status < 400) || acceptable.has(response.status)) return
      if (attempt === 1) throw new Error('HTTP ' + response.status)
    } catch (error) {
      if (attempt === 1) throw error
    } finally {
      clearTimeout(timer)
    }
  }
}

for (const file of await walk(contentRoot)) {
  const text = await fs.readFile(file, 'utf8')
  const relative = path.relative(cwd, file)
  for (const [pattern, message] of legacyPatterns) {
    for (const match of text.matchAll(pattern)) {
      errors.push(relative + ':' + lineOf(text, match.index ?? 0) + ': ' + message + ' (' + match[0] + ')')
    }
  }
  for (const link of collectLinks(text)) {
    if (isIgnored(link.url)) continue
    if (/^https?:\/\//i.test(link.url)) {
      if (link.url.startsWith('http://localhost')) continue
      if (link.url.startsWith('https://')) {
        const sources = externalLinks.get(link.url) ?? []
        sources.push(relative + ':' + lineOf(text, link.index))
        externalLinks.set(link.url, sources)
      }
      continue
    }
    const candidates = candidatesFor(file, link.url)
    if (!(await Promise.all(candidates.map(exists))).some(Boolean)) {
      errors.push(relative + ':' + lineOf(text, link.index) + ': 站内目标不存在 (' + link.url + ')')
    }
  }
}

if (checkExternal) {
  for (const [url, sources] of externalLinks) {
    try {
      await checkExternalUrl(url)
    } catch (error) {
      const message = sources[0] + ': 外链探测失败 (' + url + '): ' + error.message
      if (new URL(url).hostname === 'cedar-v.com' || new URL(url).hostname.endsWith('.cedar-v.com')) errors.push(message)
      else warnings.push(message)
    }
  }
}

if (warnings.length) console.warn(warnings.join('\n'))
if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}
console.log('Link check passed: ' + externalLinks.size + ' external HTTPS links indexed' + (checkExternal ? ' and probed.' : '.'))
