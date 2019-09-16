import Axios from 'axios'
import { Notification } from 'element-ui'
import store from '@store'
import { lsInstance } from '@common/util'
import constants from '@common/constants'

/**
 * axios实例
 * @type {AxiosInstance}
 */
let instance = Axios.create({
  headers: {
    x_requested_with: 'XMLHttpRequest'
  }
})

/**
 * axios请求过滤器
 */
instance.interceptors.request.use(
  config => {
    if (lsInstance.getItem(constants.TOKEN_KEY)) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = lsInstance.getItem(constants.TOKEN_KEY)
    }
    config.url = process.env.VUE_APP__BASE_URL + config.url
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

function doLogout (message) {
  store
    .dispatch('auth/logout')
    .then(() => {
      Notification.error({
        title: '提示',
        message: message
      })
    })
    .catch(err => {
      console.error(err)
    })
}

/**
 * axios响应过滤器
 */
instance.interceptors.response.use(
  response => {
    switch (response.data.code) {
      case '200':
        return response
      case '401':
        doLogout(response.data.message)
        break
      case '403':
        Notification.error({
          title: '提示',
          message: response.data.message
        })
        break
      case '500':
        Notification.error({
          title: '提示',
          message: response.data.message
        })
        break
      default:
        return response
    }
  },
  error => {
    console.error(error)
    if (error.response.status === 500) {
      let { data } = error.response
      if (data !== null && data !== undefined) {
        let { code, message } = data
        if (code === '401') {
          doLogout(message)
        }
      } else {
        Notification.error({
          title: '提示',
          message: error.response.data.message
        })
      }
    } else {
      return Promise.reject(error.response)
    }
  }
)

export default instance
