import axios from '../plugins/axios'

export interface IFetchOfflineMessagePayload {
  sessionId: string
  pageNum: number
  pageSize: number
}

export const fetchOfflineMessage = ({ sessionId, pageNum, pageSize }: IFetchOfflineMessagePayload) => {
  return axios.get('/msg/offline', {
    params: {
      sessionId,
      pageNum,
      pageSize
    }
  })
}