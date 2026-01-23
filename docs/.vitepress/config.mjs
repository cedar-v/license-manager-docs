import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(
  defineConfig({
    title: 'License Manager',
    lang: 'zh-CN',
    description: 'License Manager Documentation',
    head: [
      // 基础 favicon / PWA
      ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/images/logo.png' }],
      ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/images/logo.png' }],
      ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/logo.png' }],
      ['link', { rel: 'manifest', href: '/site.webmanifest' }],

      // SEO 基础标签
      [
        'meta',
        {
          name: 'description',
          content:
            'License Manager - 专业的企业级软件授权管理系统，支持在线/离线授权模式，基于硬件绑定确保安全性。一站式解决授权码生成、发放、验证与全生命周期管理。'
        }
      ],
      [
        'meta',
        {
          name: 'keywords',
          content: '软件授权管理,License Manager,授权码生成,硬件绑定,软件许可,许可证管理,软件保护'
        }
      ],
      ['meta', { name: 'author', content: 'License Manager Team' }],
      ['meta', { name: 'robots', content: 'index, follow' }],
      ['meta', { name: 'googlebot', content: 'index, follow' }],
      ['meta', { name: 'language', content: 'zh-CN' }],

      // Open Graph (Facebook, LinkedIn, etc.)
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:title', content: 'License Manager - 专业软件授权管理系统' }],
      [
        'meta',
        {
          property: 'og:description',
          content: '企业级软件授权管理系统，支持在线/离线授权，硬件绑定保护，完整生命周期管理'
        }
      ],
      ['meta', { property: 'og:image', content: '/images/logo.png' }],
      ['meta', { property: 'og:url', content: 'https://docs.lm.cedar-v.com' }],
      ['meta', { property: 'og:site_name', content: 'License Manager' }],
      ['meta', { property: 'og:locale', content: 'zh_CN' }],

      // Twitter Card
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:title', content: 'License Manager - 专业软件授权管理系统' }],
      [
        'meta',
        {
          name: 'twitter:description',
          content: '企业级软件授权管理系统，支持在线/离线授权，硬件绑定保护，完整生命周期管理'
        }
      ],
      ['meta', { name: 'twitter:image', content: '/images/logo.png' }],
      ['meta', { name: 'twitter:site', content: '@LicenseManager' }],

      // 移动设备优化（避免重复注入 viewport，这里只保留 PWA 相关）
      ['meta', { name: 'mobile-web-app-capable', content: 'yes' }],
      ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
      ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }],
      ['meta', { name: 'apple-mobile-web-app-title', content: 'License Manager' }],

      // 百度 SEO
      ['meta', { name: 'baidu-site-verification', content: 'codeva-3kpa9ujDyB' }],
      ['meta', { name: 'renderer', content: 'webkit' }],
      ['meta', { name: 'applicable-device', content: 'pc,mobile' }],

      // 安全和性能
      ['meta', { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' }],
      ['meta', { name: 'format-detection', content: 'telephone=no' }],

      // 百度统计
      [
        'script',
        {},
        `var _hmt=_hmt||[];(function(){var hm=document.createElement("script");hm.src="https://hm.baidu.com/hm.js?0bb0e3047706f56c57a9faf920fcde2a";var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(hm,s)})();`
      ],

      // 结构化数据 (JSON-LD)
      [
        'script',
        { type: 'application/ld+json' },
        JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'License Manager',
          description: '专业的企业级软件授权管理系统，支持在线/离线授权模式，基于硬件绑定确保安全性',
          url: 'https://docs.lm.cedar-v.com',
          applicationCategory: 'DeveloperApplication',
          operatingSystem: 'Cross-platform',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'CNY' },
          author: { '@type': 'Organization', name: 'License Manager Team' },
          publisher: { '@type': 'Organization', name: 'License Manager Team' }
        })
      ],

      ['script', { src: 'https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js' }],
      ['link', { rel: 'stylesheet', href: '/.vitepress/custom.css' }]
    ],
    base: '/', // 使用自定义域名时，base 应该设置为 '/'

    // 忽略死链检查
    ignoreDeadLinks: [
      // 忽略所有 localhost 链接
      /^https?:\/\/localhost/,
      // 忽略演示环境链接
      /^http:\/\/lm\.cedar-v\.com/
    ],

    locales: {
      root: {
        label: '中文',
        lang: 'zh-CN',
        themeConfig: {
          nav: [
            { text: '首页', link: '/' },
            { text: '指南', link: '/guide/' }
          ],
          sidebar: {
            '/guide/': [
              {
                text: '指南',
                items: [
                  { text: '介绍', link: '/guide/' },
                  { text: '快速开始', link: '/guide/getting-started' },
                  { text: '操作指南', link: '/guide/operating_guide' },
                  { text: '许可证结构与验证（客户端要点）', link: '/guide/license-token-structure' },
                  { text: '客户端 SDK', link: '/guide/sdk' },
                  { text: '商业价值', link: '/guide/business_value' },
                  { text: '接口文档', link: '/guide/api' },
                  { text: '社区发展策略', link: '/guide/community_strategy' }
                ]
              }
            ]
          }
        }
      },
      en: {
        label: 'English',
        lang: 'en-US',
        link: '/en/',
        themeConfig: {
          nav: [
            { text: 'Home', link: '/en/' },
            { text: 'Guide', link: '/en/guide/' }
          ],
          sidebar: {
            '/en/guide/': [
              {
                text: 'Guide',
                items: [
                  { text: 'Introduction', link: '/en/guide/' },
                  { text: 'Getting Started', link: '/en/guide/getting-started' },
                  { text: 'Operating Guide', link: '/en/guide/operating_guide' },
                  { text: 'Client SDK', link: '/en/guide/sdk' },
                  { text: 'Business Value', link: '/en/guide/business_value' },
                  { text: 'License Structure & Validation', link: '/en/guide/license-token-structure' },
                  { text: 'API Reference', link: '/en/guide/api' },
                  { text: 'Community Strategy', link: '/en/guide/community_strategy' }
                ]
              }
            ]
          }
        }
      }
    },

    themeConfig: {
      siteTitle: 'License Manager',
      search: {
        provider: 'local',
        options: {
          locales: {
            'zh-CN': {
              translations: {
                button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
                modal: {
                  displayDetails: '显示详细列表',
                  resetButtonTitle: '清除查询条件',
                  backButtonTitle: '返回上一级',
                  noResultsText: '无法找到相关结果',
                  footer: {
                    selectText: '选择',
                    selectKeyAriaLabel: 'enter',
                    navigateText: '切换',
                    navigateUpKeyAriaLabel: '上箭头',
                    navigateDownKeyAriaLabel: '下箭头',
                    closeText: '关闭',
                    closeKeyAriaLabel: 'escape'
                  }
                }
              }
            }
          }
        }
      }
    },

    markdown: {
      mermaid: true
    }
  })
)
