import axios from 'axios'

export default {
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
  createSession: ({ createBy, friendId, sessionType, groupId }) => {
    return axios.request({
      url: `/user/session`,
      method: 'post',
      data: {
        createBy,
        friendId,
        sessionType,
        groupId
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
