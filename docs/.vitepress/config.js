export default {
  title: 'License Manager',
  description: 'License Manager Documentation',
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
                { text: '快速开始', link: '/guide/getting-started' }
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
                { text: 'Getting Started', link: '/en/guide/getting-started' }
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
            { text: 'Getting Started', link: '/guide/getting-started' }
          ]
        }
      ]
    }
  }
}
