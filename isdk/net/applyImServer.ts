import axios from '../plugins/axios'
import { IUser, IImServerInfo } from '../defines'
interface IApplyImServerResponse {
  user: IUser,
  imServerVO: IImServerInfo
}
export const applyImServer = (id: string) => {
  return axios.get<IApplyImServerResponse>(`/router/imServer`, {
    params: {
      userId: id
    }
  })
}