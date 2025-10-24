export default {
  title: 'License Manager 文档',
  description: 'License Manager 使用文档',

  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'License Manager 文档',
      description: 'License Manager 使用文档',
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'License Manager Documentation',
      description: 'License Manager Documentation',
    }
  },

  themeConfig: {
    locales: {
      root: {
        nav: [
          { text: '首页', link: '/' },
          { text: '指南', link: '/guide/' }
        ],
        sidebar: {
          '/guide/': [
            { text: '介绍', link: '/guide/' }
          ]
        }
      },
      en: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Guide', link: '/en/guide/' }
        ],
        sidebar: {
          '/en/guide/': [
            { text: 'Introduction', link: '/en/guide/' }
          ]
        }
      }
    }
  }
}
