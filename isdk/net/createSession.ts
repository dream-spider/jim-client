import axios from '../plugins/axios'

export interface ICreateSessionPayload {
  createBy: string,
  friendId: string,
  sessionType: string
}

export const createSession = ({ createBy, friendId, sessionType }: ICreateSessionPayload) => {
  return axios.post('/user/session', {
    createBy,
    friendId,
    sessionType
  })
}