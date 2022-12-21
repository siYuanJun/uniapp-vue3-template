export default {
  sleep(delay) {
    var start = new Date().getTime()
    while (new Date().getTime() - start < delay) {
      continue
    }
  },
  amountFloor(price) {
    return Math.floor(price * 100) / 100
  },
  moneyInput(price) {
    if (!price) {
      return price
    }

    price = price.replace(/[^\d.]/g, '') //清除“数字”和“.”以外的字符
    price = price.replace(/\.{2,}/g, '.') //只保留第一个. 清除多余的
    price = price.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
    price = price.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3') //只能输入两个小数
    // 去除整数前的0和小数点后多余的0，如011.020300 =》 11.0203
    const reg1 = /0*([1-9]\d*|0\.\d+)/
    const reg2 = /(?:\.0*|(\.\d+?)0+)$/
    price = price.replace(reg1, '$1').replace(reg2, '$1')

    return price
  },
  base64ToBlob(base64) {
    return new Promise(function (resolve, reject) {
      var arr = base64.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return resolve(
        (window.URL || window.webkitURL).createObjectURL(
          new Blob([u8arr], {
            type: mime,
          })
        )
      )
    })
  },

  dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }

    return new File([u8arr], filename, { type: mime })
  },

  downSaveImage(imgurl) {
    console.log(imgurl)

    uni.showModal({
      title: '保存图片',
      content: '是否保存当前图片？',
      success: (res) => {
        if (res.confirm) {
          // #ifdef H5
          var oA = document.createElement('a')
          oA.download = '' // 设置下载的文件名，默认是'下载'
          oA.href = imgurl
          document.body.appendChild(oA)
          oA.click()
          oA.remove() // 下载之后把创建的元素删除
          // #endif

          // #ifndef H5
          uni.downloadFile({
            url: imgurl,
            success: (res) => {
              if (res.statusCode === 200) {
                uni.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath,
                  success: function () {
                    uni.showToast({
                      title: '保存成功',
                      duration: 2000,
                    })
                  },
                  fail: function () {
                    uni.showToast({
                      title: '保存失败，请稍后重试',
                      icon: 'none',
                    })
                  },
                })
              }
            },
          })
          // #endif
        } else if (res.cancel) {
          // uni.showToast({
          //   title: '你取消了该操作',
          //   icon: 'none',
          //   duration: 2000,
          // })
        }
      },
    })
  },
  href(url) {
    uni.navigateTo({
      url,
    })
  },
  hrefSave(url, data, key) {
    uni.setStorage({
      key: key || 'content',
      data: data || null,
      success: (result) => {
        uni.navigateTo({
          url,
        })
      },
      fail: () => {},
      complete: () => {},
    })
  },
  hrefBackSave(data, key) {
    uni.setStorage({
      key: key || 'content',
      data: data || null,
      success: (result) => {
        uni.navigateBack()
      },
      fail: () => {},
      complete: () => {},
    })
  },
  // 表单验证
  frmVerification(formdata, field, message) {
    return new Promise((resolve, reject) => {
      let status = 0
      for (var i = 0; i < field.length; i++) {
        if (formdata[field[i]] === '') {
          uni.showToast({
            title: message[i] + '不能为空',
            icon: 'none',
            duration: 2000,
          })
          return
        } else {
          status += 1
        }
      }
      if (status === field.length) {
        resolve(formdata)
      }
    })
  },

  phoneVerification(phone) {
    const myreg = /^[1][1,2,3,4,5,6,7,8,9][0-9]{9}$/
    return !myreg.test(phone)
  },

  emailVerification(str) {
    const reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/
    return !reg.test(str)
  },

  alert(title, type) {
    uni.showToast({
      title: title,
      icon: 'none',
      success: () => {
        if (type) {
          if (type === 'back') {
            setTimeout(() => {
              uni.navigateBack({
                delta: 1,
              })
            }, 1000)
            return
          }
          uni.redirectTo({
            url: type,
          })
        }
      },
    })
  },

  timestampFormat(timeStamp, returnData) {
    /** 把时间戳转换为日期格式
     * @timeStamp {string} 时间戳
     * @returnData {Number} 要返回数据格式 yy-mm-dd hh:mi:ss
     * @return {string} 返回格式化后的时间
     */
    returnData = returnData || 'yy-mm-dd hh:mi:ss'
    timeStamp = Number(timeStamp)
    let year = new Date(timeStamp).getFullYear()
    let month =
      new Date(timeStamp).getMonth() + 1 < 10
        ? '0' + (new Date(timeStamp).getMonth() + 1)
        : new Date(timeStamp).getMonth() + 1
    let date = new Date(timeStamp).getDate() < 10 ? '0' + new Date(timeStamp).getDate() : new Date(timeStamp).getDate()
    let hh = new Date(timeStamp).getHours() < 10 ? '0' + new Date(timeStamp).getHours() : new Date(timeStamp).getHours()
    let mm =
      new Date(timeStamp).getMinutes() < 10 ? '0' + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes()
    let ss =
      new Date(timeStamp).getSeconds() < 10 ? '0' + new Date(timeStamp).getSeconds() : new Date(timeStamp).getSeconds()

    returnData = returnData.replace('yy', year)
    returnData = returnData.replace('mm', month)
    returnData = returnData.replace('dd', date)
    returnData = returnData.replace('hh', hh)
    returnData = returnData.replace('mi', mm)
    returnData = returnData.replace('ss', ss)
    return returnData
  },
  timeFrom(dateTime = null, format = 'yy-mm-dd') {
    // 如果为null,则格式化当前时间

    if (!dateTime) dateTime = Number(new Date())
    // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式

    if (dateTime.toString().length == 10) dateTime *= 1000
    let timestamp = +new Date(Number(dateTime))

    let timer = (Number(new Date()) - timestamp) / 1000
    // 如果小于5分钟,则返回"刚刚",其他以此类推

    let tips = ''
    switch (true) {
      case timer < 300:
        tips = '刚刚'
        break
      case timer >= 300 && timer < 3600:
        tips = parseInt(timer / 60) + '分钟前'
        break
      case timer >= 3600 && timer < 86400:
        tips = parseInt(timer / 3600) + '小时前'
        break
      case timer >= 86400 && timer < 604800:
        tips = parseInt(timer / 86400) + '天前'
        break
      case timer >= 604800 && timer < 2592000:
        tips = parseInt(timer / 604800) + '周前'
        break
      default:
        // 如果format为false，则无论什么时间戳，都显示xx之前

        if (format === false) {
          if (timer >= 2592000 && timer < 365 * 86400) {
            tips = parseInt(timer / (86400 * 30)) + '个月前'
          } else {
            tips = parseInt(timer / (86400 * 365)) + '年前'
          }
        } else {
          tips = this.timestampFormat(timestamp, format)
        }
    }
    return tips
  },
  stringDealWith(str, sep = '***', left = 4, right = 4) {
    str = str.toString()
    return `${str.slice(0, left)}${sep}${str.slice(str.length - right, str.length)}`
  },
  copyData(data, note) {
    if (!data) {
      return
    }
    uni.setClipboardData({
      data,
      success: () => {
        this.alert(note || '复制成功')
      },
    })
  },
  secondsToTime(seconds) {
    const minutes = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0')
    const s = parseInt(seconds % 60)
      .toString()
      .padStart(2, '0')
    return `${minutes}分${s}秒`
  },
}
