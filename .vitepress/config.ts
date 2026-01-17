import { defineConfig } from 'vitepress'

export default defineConfig({
  // 网站基本信息
  title: 'License Manager',
  lang: 'zh-CN',

  // SEO 和 Meta 标签
  head: [
    // 基础 favicon
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/images/logo.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/images/logo.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/logo.png' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],

    // SEO 基础标签
    ['meta', { name: 'description', content: 'License Manager - 专业的企业级软件授权管理系统，支持在线/离线授权模式，基于硬件绑定确保安全性。一站式解决授权码生成、发放、验证与全生命周期管理。' }],
    ['meta', { name: 'keywords', content: '软件授权管理,License Manager,授权码生成,硬件绑定,软件许可,许可证管理,软件保护' }],
    ['meta', { name: 'author', content: 'License Manager Team' }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['meta', { name: 'googlebot', content: 'index, follow' }],
    ['meta', { name: 'language', content: 'zh-CN' }],

    // Open Graph (Facebook, LinkedIn, etc.)
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'License Manager - 专业软件授权管理系统' }],
    ['meta', { property: 'og:description', content: '企业级软件授权管理系统，支持在线/离线授权，硬件绑定保护，完整生命周期管理' }],
    ['meta', { property: 'og:image', content: '/images/logo.png' }],
    ['meta', { property: 'og:url', content: 'https://lm.cedar-v.com' }],
    ['meta', { property: 'og:site_name', content: 'License Manager' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],

    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'License Manager - 专业软件授权管理系统' }],
    ['meta', { name: 'twitter:description', content: '企业级软件授权管理系统，支持在线/离线授权，硬件绑定保护，完整生命周期管理' }],
    ['meta', { name: 'twitter:image', content: '/images/logo.png' }],
    ['meta', { name: 'twitter:site', content: '@LicenseManager' }],

    // 移动设备优化
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { name: 'mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'License Manager' }],

    // 百度SEO优化 - 请替换为你的实际百度验证代码
    // ['meta', { name: 'baidu-site-verification', content: '你的验证代码' }],
    ['meta', { name: 'renderer', content: 'webkit' }],
    ['meta', { name: 'applicable-device', content: 'pc,mobile' }],

    // 安全和性能
    ['meta', { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' }],
    ['meta', { name: 'format-detection', content: 'telephone=no' }],

    // 百度统计代码
    ['script', {}, `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?0bb0e3047706f56c57a9faf920fcde2a"; // 百度统计ID
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();
    `],

    // 结构化数据 (JSON-LD)
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': 'License Manager',
      'description': '专业的企业级软件授权管理系统，支持在线/离线授权模式，基于硬件绑定确保安全性',
      'url': 'https://lm.cedar-v.com',
      'applicationCategory': 'DeveloperApplication',
      'operatingSystem': 'Cross-platform',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'CNY'
      },
      'author': {
        '@type': 'Organization',
        'name': 'License Manager Team'
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'License Manager Team'
      }
    })]
  ],

  // 多语言配置
  locales: {
    root: {
      label: '中文',
      lang: 'zh-CN'
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/'
    }
  },

  // 主题配置
  themeConfig: {
    // SEO 友好的站点信息
    siteTitle: 'License Manager',

    // 搜索优化
    search: {
      provider: 'local',
      options: {
        locales: {
          'zh-CN': {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
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

  // Vite 配置
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'mermaid': ['mermaid']
          }
        }
      }
    }
  }
})
