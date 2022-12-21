<script>
import { getGsInfo, getu, isLogin } from '@/utils/user'
import { useStore } from 'vuex'

export default {
  onLaunch: function () {
    const store = useStore()
    store.commit('updateUserInfo', getu())

    if (isLogin()) {
      this.updateUserData()
    }
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
}
</script>

<style lang="scss">
@import '/assets/css/app.scss';
</style>
