import Vue from 'vue'
import Router from 'vue-router'
import Main from '@common/components/main/MainSection'
import DemoIndex from '@business/demo/components/Index'
import AuthDemo from '@business/demo/components/AuthTest'
import Error from '@common/components/tips/Error'
import HomeIndex from '@business/home/components/Index'
import ImMain from '@business/home/components/ImMain'
import Contact from '@business/home/components/ContactList'

Vue.use(Router)
const routePaths = {
  demo: '/demo/index',
  home: '/',
  homeIndex: '/home/index',
  imMain: '/imMain',
  contact: '/contact'
}
const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: routePaths.home,
      name: 'home',
      component: Main,
      children: [
        {
          path: routePaths.homeIndex,
          name: 'homeIndex',
          component: HomeIndex
        },
        {
          path: routePaths.imMain,
          name: 'imMain',
          props: route => ({ userId: route.query.userId }),
          component: ImMain
        },
        {
          path: routePaths.contact,
          name: 'contact',
          component: Contact
        },
        {
          path: routePaths.demo,
          name: 'demo',
          component: DemoIndex
        }
      ]
    },
    {
      path: '/demo/auth',
      name: 'authDemo',
      component: AuthDemo
    },
    {
      path: '/auth/error',
      name: 'Error',
      props: route => ({ errorCode: route.query.errorCode }),
      component: Error
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (
    to.path === '/auth/error' ||
    to.path === '/' ||
    to.path === '/index.html'
  ) {
    next()
    return
  }
  let errorCode = 200
  let pathExists = false
  // 判断是否合法路由
  for (let path in routePaths) {
    if (routePaths[path] === to.path) {
      pathExists = true
      break
    }
  }
  if (!pathExists) {
    errorCode = 404
  }
  errorCode === 200 ? next() : next('/auth/error?errorCode=' + errorCode)
})
export default router
