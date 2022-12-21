import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App,
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import common from '@/utils/common.js'
import config from '@/utils/config.js'
import myMixin from '@/utils/mixinPublic.js'
import store from './store'

export function createApp() {
  const app = createSSRApp(App)

  app.config.globalProperties.$gs = {
    ...config,
  }

  app.config.globalProperties.common = common
  app.mixin(myMixin)
  app.use(store)

  return {
    app,
  }
}
// #endif

// development production
if (process.env.NODE_ENV === 'production') {
  console.log = () => {}
  console.info = () => {}
}
