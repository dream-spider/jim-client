import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { IResponse } from '../defines/IResponse'

const instance = axios.create({
  baseURL: '/api/',
})

const onError = () => {

}

instance.interceptors.response.use(undefined, onError)


export default {
  async get<T> (url: string, config?: AxiosRequestConfig) {
    const response = await instance.get<IResponse<T>>(url, config)
    return response.data
  },
  async post<T> (url: string, data?: any, config?: AxiosRequestConfig) {
    const response = await instance.post<IResponse<T>>(url, data, config)
    return response.data
  }
}