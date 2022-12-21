import config from './config'
import common from './common'
import { getGsInfo, removeGsInfo } from './user'

export default {
  fetchRequest(opt) {
    return new Promise((resolve, reject) => {
      opt = opt || {}
      if (!opt.url) {
        reject('请求地址错误')
        return false
      }
      opt.url = config.api + opt.url
      opt.debug = opt.debug || ''
      opt.data = opt.data || {}
      opt.method = opt.get ? 'GET' : 'POST'
      opt.header = {
        'content-type': 'application/json',
        Authorization: getGsInfo('token') || '',
        ...(opt.header || {}),
      }
      if (opt.debug) console.log(opt)
      uni.request({
        url: opt.url,
        data: opt.data,
        method: opt.method,
        header: opt.header,
        headers: opt.header,
        dataType: 'json',
        success: (res) => {
          if (opt.debug) console.log(err)
          if (res.statusCode === 200 && res.data.code === 200) {
            resolve(res.data.data)
          } else if ([10000, 10001, 10002].includes(res.data.code)) {
            common.alert(res.data.message)
            removeGsInfo()

            setTimeout(() => {
              uni.reLaunch({
                url: '/views/user/login',
              })
            }, 1000)
          } else if (res.data.code === 10014) {
            common.alert('请实名认证')
            setTimeout(() => {
              uni.navigateTo({
                url: '/views/user/real-name',
              })
            }, 1000)
          } else if (res.data.code === 10013) {
            reject()
          } else {
            reject()
            common.alert(res.data.message)
          }
        },
        fail: (err) => {
          if (opt.debug) console.log(err)
          reject(err)
        },
      })
    })
  },
}
