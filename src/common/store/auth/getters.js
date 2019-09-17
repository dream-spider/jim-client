import constants from '@/isdk/constants'
import { lsInstance, makeTree } from '@common/util'
import config from '@/config'
export default {
  menuTree: state => {
    const principal =
      state.principal || JSON.parse(lsInstance.getItem(constants.PRINCIPAL_KEY))
    return principal
      ? principal.menus === null
        ? null
        : makeTree(
          'id',
          'parent',
          principal.menus.filter(menu => {
            return (
              (menu.menuType === '2' || menu.menuType === '3') &&
                menu.parent !== config.system.menuRoot
            )
          })
        )
      : {}
  },
  user: state => {
    const principal =
      state.principal || JSON.parse(lsInstance.getItem(constants.PRINCIPAL_KEY))
    return principal === null ? {} : principal.user
  },
  indexPage: state => {
    const principal =
      state.principal || JSON.parse(lsInstance.getItem(constants.PRINCIPAL_KEY))
    if (principal === null) {
      return '/'
    } else {
      let urledMenus = principal.menus.filter(menu => {
        return menu.url
      })
      return urledMenus.length > 0 ? urledMenus[0].url : '/'
    }
  },
  hasPermission: state => authCode => {
    const principal =
      state.principal || JSON.parse(lsInstance.getItem(constants.PRINCIPAL_KEY))
    if (principal !== null) {
      let permissionE = principal.elements.filter(e => {
        return e.id === authCode
      })
      return permissionE.length > 0
    }
    return false
  },
  hasRouterPermission: state => url => {
    const principal =
      state.principal || JSON.parse(lsInstance.getItem(constants.PRINCIPAL_KEY))
    if (principal === null) {
      return false
    }
    let menuFilter = principal.menus.filter(e => {
      return e.url === url
    })
    if (menuFilter.length > 0) {
      return true
    }

    /* let elmentFilter = principal.elements.filter(e => {
        return e.text === url
    })

    if (elmentFilter.length > 0) {
      return true
    } */
    return false
  }
}
