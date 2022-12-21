import { createStore } from 'vuex'

const store = createStore({
  state: {
    userinfo: {},
    messageStatus: 1,
    messageNum: 0,
  },
  mutations: {
    updateUserInfo(state, data) {
      state.userinfo = data
    },
    setMessageStatus(state, data) {
      state.messageStatus = data
    },
    setMessageNum(state, data) {
      state.messageNum = data
    },
  },
})

export default store
