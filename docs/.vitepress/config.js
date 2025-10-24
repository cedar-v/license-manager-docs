export default {
  base: '/license-manager-docs/',  // 改成你的仓库名
  title: 'License Manager 文档',
  description: 'License Manager 使用文档',
  
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' }
    ],
    
    sidebar: [
      {
        text: '开始',
        items: [
          { text: '介绍', link: '/guide/' },
          { text: '快速开始', link: '/guide/getting-started' }
        ]
      }
    ]
  }
}