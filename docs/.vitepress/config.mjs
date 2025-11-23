import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(
  defineConfig({
    title: 'License Manager',
    description: 'License Manager Documentation',
    head: [
      ['script', { src: 'https://code.iconify.design/iconify-icon/1.0.8/iconify-icon.min.js', defer: '' }]
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
                  { text: '许可证结构与验证（客户端要点）', link: '/guide/license-token-structure' },
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
      nav: [
        { text: 'Home', link: '/' },
        { text: 'Guide', link: '/guide/' }
      ],

      sidebar: {
        '/guide/': [
          {
            text: 'Guide',
            items: [
              { text: 'Introduction', link: '/guide/' },
              { text: 'Getting Started', link: '/guide/getting-started' },
              { text: 'License Token Structure', link: '/guide/license-token-structure' },
              { text: 'API 文档 | API Reference', link: '/guide/api' }
            ]
          }
        ]
      }
    },

    markdown: {
      mermaid: true
    }
  })
)
