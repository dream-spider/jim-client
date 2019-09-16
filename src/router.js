import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/app/portal/layout/MainSection.vue'
import Error from '@/app/portal/ImError.vue'
import Home from '@/app/portal/ImMain.vue'
import Chat from '@/app/portal/chat/ImChat.vue'
import Contact from '@/app/portal/contact/ImContact.vue'

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
