import { useStore } from 'vuex'

const storeKey = 'tiko-h5'

export const getUserToken = () => {
  return getGsInfo('token')
}

export const getGsInfo = (field) => {
  const gs = uni.getStorageSync(`${storeKey}-$gs`) || {}
  return field ? gs[field] : gs
}

export const setGsInfo = (data) => {
  uni.setStorageSync(`${storeKey}-$gs`, { ...getGsInfo(), ...data })
}

export const removeGsInfo = () => {
  uni.removeStorageSync(`${storeKey}-$gs`)
}

export const getu = (field) => {
  let userinfo = getGsInfo('userinfo') || {}

  return field ? userinfo[field] : userinfo
}

export const isLogin = () => {
  return getGsInfo('token')
}
