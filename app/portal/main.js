import 'core-js/stable'
import "regenerator-runtime/runtime"
import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import dayjs from 'dayjs'
import '@modules/theme/index.scss'

import { 
  Table, 
  TableColumn, 
  Main, 
  Container, 
  Loading, 
  Button 
} from 'element-ui'

const components = [
  Table, TableColumn, Main, Container,
  Loading, Button
]

components.forEach((component) => {
  Vue.use(component)
})

Vue.config.productionTip = false
Vue.filter('dateformat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(dataStr).format(pattern)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
