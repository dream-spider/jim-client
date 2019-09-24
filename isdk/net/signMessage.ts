import axios from '../plugins/axios'

export const signMessage = (sessionId: string) => {
  return axios.post(`/msg/sign/session/${sessionId}`)
}