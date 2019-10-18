import axios from '../plugins/axios'

export const queryCustomerList = () => {
  return axios.get('/user/customerServices')
}