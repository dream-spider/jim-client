import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { IResponse } from '../defines/IResponse'

const instance = axios.create({
  baseURL: process.env.SERVICE_REQUEST_CTX || '/',
})

const onError = () => {

}

instance.interceptors.response.use(undefined, onError)


export default {
  async get<T> (url: string, config?: AxiosRequestConfig) {
    console.log(url)
    const response = await instance.get<IResponse<T>>(url, config)
    return response.data
  },
  async post<T> (url: string, data?: any, config?: AxiosRequestConfig) {
    console.log(url)
    const response = await instance.post<IResponse<T>>(url, data, config)
    return response.data
  }
}
