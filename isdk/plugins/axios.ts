import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { IResponse } from '../defines/IResponse'

const instance = axios.create()

const onError = () => {

}

instance.interceptors.response.use(undefined, onError)


export default {
  async get<T> (url: string, config?: AxiosRequestConfig) {
    const response = await instance.get<IResponse<T>>(url, config)
    return response.data
  }
}