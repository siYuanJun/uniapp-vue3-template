import server from './server'
import { getGsInfo, setGsInfo } from './user'
import { getUserDetails } from '@/services/user'

export default {
  data() {
    return {}
  },
  methods: {
    ajax(opt) {
      return server.fetchRequest(opt)
    },
    updateUserData() {
      const that = this
      getUserDetails()
        .then((res) => {
          let data = res
          data.nickName = res.nickName.substring(0, 6)
          console.log(data)

          that.$gs.userinfo = data
          that.$store.commit('updateUserInfo', data)

          setGsInfo({ userinfo: data })

          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    },
  },
}
