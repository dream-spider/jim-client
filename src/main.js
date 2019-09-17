import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import dayjs from 'dayjs'
import '@/app/portal/theme/index.scss'
import constants from '@/isdk/constants'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.filter('dateformat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(dataStr).format(pattern)
})

Vue.prototype.$constants = constants
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
