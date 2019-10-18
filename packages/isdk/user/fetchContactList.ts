import axios from '../plugins/axios'

export const fetchContactList = (userId: string) => {
  return axios.get('/user/contacts', {
    params: {
      userId
    }
  })
}