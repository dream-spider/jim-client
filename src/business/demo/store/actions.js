import demoApi from '@business/demo/api'
export default {
  loadDemoList ({ commit }, { id, name, age, birthday }) {
    demoApi.queryDemoList({ id, name, age, birthday }).then(res => {
      commit('setDemoList', { demoList: res.data.data })
    })
  }
}
