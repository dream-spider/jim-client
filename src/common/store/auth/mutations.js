import Constants from '@/isdk/constants'
import { lsInstance } from '@common/util'
export default {
  setToken (state, payload) {
    lsInstance.setItem(Constants.TOKEN_KEY, payload.token)
    state.token = payload.token
  },
  setAccessToken (state, payload) {
    lsInstance.setItem(Constants.ACCESS_TOKEN_KEY, payload.accessToken)
    state.accessToken = payload.accessToken
  },
  setPrincipal (state, payload) {
    lsInstance.setItem(Constants.PRINCIPAL_KEY, JSON.stringify(payload.principal))
    state.principal = payload.principal
  },
  clearSession (state) {
    lsInstance.removeItem(Constants.PRINCIPAL_KEY)
    lsInstance.removeItem(Constants.TOKEN_KEY)
    lsInstance.removeItem(Constants.ACCESS_TOKEN_KEY)
    state.principal = null
    state.roles = null
    state.accessToken = null
  }
}
