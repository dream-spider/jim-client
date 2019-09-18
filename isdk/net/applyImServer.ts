import axios from '../plugins/axios'
export const applyImServer = (id: string) => {
  return axios.get(`/router/imServer`, {
    params: {
      userId: id
    }
  })
}