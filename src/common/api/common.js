import axios from '@common/plugins/Axios'
import { Message } from 'element-ui'

/**
 * 通用api
 */
class Common {
  /**
   * 附件下载
   * @param param
   * @returns {ClientHttp2Stream | http.ClientRequest | * | AxiosPromise<any>}
   */
  downloadAttachment (id, fileName) {
    axios.request({
      url: `/attachment/download/${id}`,
      method: 'get',
      responseType: 'blob'
    }).then(res => {
      if (res.data.size === 0) {
        Message({
          type: 'error',
          message: '下载失败，文件不存在或权限不足'
        })
      } else {
        let blob = new Blob([res.data])
        fileName = fileName || '未知文件'
        if (window.navigator.msSaveOrOpenBlob) {
          navigator.msSaveBlob(blob, fileName)
        } else {
          let link = document.createElement('a')
          let evt = document.createEvent('HTMLEvents')
          evt.initEvent('click', false, false)
          link.href = URL.createObjectURL(blob)
          link.download = fileName
          link.style.display = 'none'
          document.body.appendChild(link)
          link.click()
          window.URL.revokeObjectURL(link.href)
        }
      }
    })
  }
}

const common = new Common()
export default common
