import Vue from 'vue'
import Router from 'vue-router'
import Main from '@modules/layout/MainSection.vue'
import Error from '@/ImError.vue'
import Home from '@/ImMain.vue'
import Chat from '@modules/chat/ImChat.vue'
import Contact from '@modules/contact/ImContact.vue'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: Main,
      children: [
        {
          path: '/',
          name: 'index',
          component: Home
        },
        {
          path: '/chat',
          name: 'chat',
          props: route => ({ userId: route.query.userId }),
          component: Chat
        },
        {
          path: '/contact',
          name: 'contact',
          component: Contact
        }
      ]
    },
    {
      path: '*',
      name: '404',
      component: Error
    }
  ]
})

export default router
