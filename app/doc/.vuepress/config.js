module.exports = {
  title: 'JIM',
  description: 'Document',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Posts', link: '/posts/' },
    ],
    sidebar: {
      '/posts/': [
        ['todo', '待办事项'],
        ['brainstorm', '头脑风暴']
      ]
    }
  }
}