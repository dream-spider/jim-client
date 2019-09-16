import axios from '@common/plugins/Axios'
/**
 * 登录鉴权模块接口集合
 */
class Auth {
  /**
   * 根据code 获取token接口
   * @param code
   * @returns {*}
   */
  getJwtToken (code) {
    return axios.request({
      url: `/authorization/token`,
      method: 'get',
      params: {
        code
      }
    })
  }

  getUser () {
    return axios.request({
      url: `/authorization/user`,
      method: 'get'
    })
  }
}
const auth = new Auth()
export default auth
