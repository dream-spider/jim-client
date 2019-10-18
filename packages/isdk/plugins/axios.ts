import axios, { AxiosRequestConfig } from 'axios'
import { getIsdkConfig } from '../config'
import { IResponse } from '../defines/IResponse'

const instance = axios.create()

export default {
  async get<T> (url: string, config?: AxiosRequestConfig) {
    const response = await instance.get<IResponse<T>>(url, {
      ...config,
      baseURL: getIsdkConfig().axios.requestContext
    })
    return response.data
  },
  async post<T> (url: string, data?: any, config?: AxiosRequestConfig) {
    const response = await instance.post<IResponse<T>>(url, data, {
      ...config,
      baseURL: getIsdkConfig().axios.requestContext
    })
    return response.data
  }
}
