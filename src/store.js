import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@common/store/auth/index'
import demmo from '@business/demo/store/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth: auth,
    demo: demmo
  }
})
