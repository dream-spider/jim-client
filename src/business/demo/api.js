import axios from '@common/plugins/Axios'

export default {
  queryDemoList: ({ id, name, age, birthday, pageNum, pageSize }) => {
    return axios.request({
      url: `/temp/demo`,
      method: 'get',
      params: {
        id,
        name,
        age,
        birthday,
        pageNum,
        pageSize
      }
    })
  },
  addDemo: ({ id, name, age, birthdate }) => {
    return axios.request({
      url: `/temp/demo`,
      method: 'post',
      params: {
        id,
        name,
        age,
        birthdate
      }
    })
  },
  getDemoById (id) {
    return axios.request({
      url: `/temp/demo/` + id,
      method: 'get'
    })
  },
  updateDemo: ({ id, name, age, birthdate }) => {
    return axios.request({
      url: `/temp/demo`,
      method: 'put',
      params: {
        id,
        name,
        age,
        birthdate
      }
    })
  },
  deleteDemo: id => {
    return axios.request({
      url: `/temp/demo/` + id,
      method: 'delete'
    })
  }
}
