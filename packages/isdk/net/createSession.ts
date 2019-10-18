import axios from '../plugins/axios'

export interface ICreateSessionPayload {
  createBy: string,
  friendId: string,
  sessionType: string,
  groupId: string
}

export const createSession = ({ createBy, friendId, sessionType, groupId }: ICreateSessionPayload) => {
  return axios.post('/user/session', {
    createBy,
    friendId,
    sessionType,
    groupId
  })
}
