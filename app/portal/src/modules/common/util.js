import config from '@/config'

export const toSSO = function () {
  window.location.href = config.authorization.authenticationUrl +
    '?client_id=' + config.authorization.clientId + '&response_type=code&redirect_uri=' +
    config.authorization.indexPage
}

export const getURLParameter = function (key) {
  let url = window.location.href
  let code = null
  url.substring(url.indexOf('?') + 1).split('&').filter(param => {
    let pMap = param.split('=')
    if (pMap[0] === key) {
      code = pMap[1]
    }
  })
  return code
}

/**
 * localStorage操作封装
 * @type {{removeItem: lsInstance.removeItem, getItem: (function(*=): string), setItem: lsInstance.setItem}}
 */
export const lsInstance = {
  getItem: (key) => {
    return localStorage.getItem(key)
  },
  setItem: (key, value) => {
    localStorage.setItem(key, value)
  },
  removeItem: (key) => {
    localStorage.removeItem(key)
  }
}

export const makeTree = function (idKey, pIdKey, data) {
  // 删除 所有 children,以防止多次调用
  data.forEach(function (item) {
    delete item.children
  })
  // 将数据存储为 以 id 为 KEY 的 map 索引数据列
  let map = {}
  data.forEach(function (item) {
    map[item[idKey]] = item
  })
  let val = []
  data.forEach(function (item) {
    // 以当前遍历项，的pid,去map对象中找到索引的id
    let parent = map[item[pIdKey]]

    // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
    if (parent) {
      (parent.children || (parent.children = [])).push(item)
    } else {
      // 如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
      val.push(item)
    }
  })
  return val
}
/**
 * y：year
 * M：month
 * d：day
 * h：hour
 * m：minute
 * s：second
 * q：quarter
 * S: millisecond
 * @desc date格式化，如：yyyy-MM-dd hh:mm:ss
 * @param {Date} dateValue
 * @param {String} fmt
 * @return {*}
 * @author hujin
 */
export const dateFormat = function (dateValue, fmt) {
  if (typeof dateValue !== 'number') {
    dateValue = parseInt(dateValue)
  }
  const date = new Date(dateValue)
  const o = {
    'y+': date.getFullYear(),
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S+': date.getMilliseconds()
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      if (k === 'y+') {
        fmt = fmt.replace(RegExp.$1, ('' + o[k]).substr(4 - RegExp.$1.length))
      } else if (k === 'S+') {
        let lens = RegExp.$1.length
        lens = lens === 1 ? 3 : lens
        fmt = fmt.replace(RegExp.$1, ('00' + o[k]).substr(('' + o[k]).length - 1, lens))
      } else {
        fmt = fmt.replace(RegExp.$1,
          (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
  }
  return fmt
}
