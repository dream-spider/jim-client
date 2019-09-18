import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
export default {
  namespaced: true,
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
}
