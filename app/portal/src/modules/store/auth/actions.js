import auth from '@isdk/auth'
import constants from '@isdk/constants'
import { toSSO } from '@modules/common/util'

export default {
  async initJwtToken ({ commit, dispatch, state }, { code }) {
    const tokenRes = await auth.getJwtToken(code)
    if (tokenRes === undefined) {
      dispatch('logout')
    }
    let { code: tokenState, data: tokenData } = tokenRes.data
    if (constants.RESP_CODE_SUCESS !== tokenState) {
      alert('接口异常')
    }
    let { jwtToken, accessToken } = tokenData
    commit('setToken', { token: jwtToken })
    commit('setAccessToken', { accessToken: accessToken })
    const principalRes = await auth.getUser()
    return principalRes
  },
  setPrincipal ({ commit }, principalData) {
    let { code: principalState, data: principal } = principalData.data
    if (constants.RESP_CODE_SUCESS !== principalState) {
      alert('接口异常')
    }
    commit('setPrincipal', { principal: principal })
  },
  logout ({ commit }) {
    commit('clearSession')
    toSSO()
  }
}
