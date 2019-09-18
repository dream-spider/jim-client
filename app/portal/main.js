import Vue from 'vue'
import App from './src/App.vue'
import router from './src/router'
import store from './src/store'
import ElementUI from 'element-ui'
import dayjs from 'dayjs'
import './src/modules/theme/index.scss'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.filter('dateformat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(dataStr).format(pattern)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
