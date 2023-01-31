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
import mixinApp from '@/utils/mixinApp.js'
import * as Pinia from 'pinia'

export function createApp() {
  const app = createSSRApp(App)

  app.config.globalProperties.$config = {
    ...config,
  }

  app.config.globalProperties.common = common
  app.mixin(mixinApp)
  app.use(Pinia.createPinia())

  return {
    app,
    Pinia,
  }
}
// #endif

// development production
if (process.env.NODE_ENV === 'production') {
  console.log = () => {}
  console.info = () => {}
}
