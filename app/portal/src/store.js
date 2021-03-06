import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@modules/store/auth/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth: auth
  }
})
