import axios from '../plugins/axios'
export const fetchSessionData = (userId: string, sessionId: string) => {
  return axios.get('/user/session', {
    params: {
      createBy: userId,
      sessionId: sessionId
    }
  })
}