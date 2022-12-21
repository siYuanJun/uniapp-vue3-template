import server from '@/utils/server'

export const productCodeList = (data) => {
  return server.fetchRequest({ url: '/productCode/list', data, get: true })
}

export const userPurse = (data) => {
  return server.fetchRequest({ url: '/user/purse', data, get: true })
}

export const getUserDetails = () => {
  return server.fetchRequest({ url: '/user/detail', data, get: true })
}
