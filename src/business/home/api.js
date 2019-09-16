import axios from '@common/plugins/Axios'

export default {
  queryCustomerList: () => {
    return axios.request({
      url: `/user/customerServices`,
      method: 'get'
    })
  },
  queryUserById: (userId) => {
    return axios.request({
      url: `/user/` + userId,
      method: 'get',
      params: {
        userId
      }
    })
  },
  applyImServer: (userId) => {
    return axios.request({
      url: `/router/imServer`,
      method: 'get',
      params: {
        userId
      }
    })
  },
  fetchContactList: (userId) => {
    return axios.request({
      url: `/user/contacts`,
      method: 'get',
      params: {
        userId
      }
    })
  },
  fetchSessionData: (userId, sessionId) => {
    return axios.request({
      url: `/user/session`,
      method: 'get',
      params: {
        createBy: userId,
        sessionId: sessionId
      }
    })
  },
  createSession: ({ createBy, friendId, sessionType }) => {
    return axios.request({
      url: `/user/session`,
      method: 'post',
      data: {
        createBy,
        friendId,
        sessionType
      }
    })
  },
  signMsg: (sessionId) => {
    return axios.request({
      url: `/msg/sign/session/` + sessionId,
      method: 'post'
    })
  },
  fetchOfflineMsg: ({ sessionId, pageNum, pageSize }) => {
    return axios.request({
      url: `/msg/offline`,
      method: 'get',
      params: {
        sessionId,
        pageNum,
        pageSize
      }
    })
  }

}
