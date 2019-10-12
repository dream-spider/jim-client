module.exports = {
  title: 'JIM',
  description: 'Document',
  dest: '../../docs',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Posts', link: '/posts/' },
    ],
    sidebar: {
      '/posts/': [
        ['todo', '待办事项'],
        ['brainstorm', '头脑风暴'],
        ['structure', '项目架构说明'],
        ['coding-guide', '前端开发规范']
      ]
    }
  }
}