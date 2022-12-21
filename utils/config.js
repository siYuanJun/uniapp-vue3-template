const NODE_ENV = process.env.NODE_ENV

// 启用钥匙 dev 正式 prod 测试
// const startStatus = 'dev'
const startStatus = 'dev'

const buildStatus = 'prod'
// const buildStatus = 'dev'

const apiConfig = {
  localhost: {
    api: 'https://test.tikoplanet.com/acg',
    webUrl: 'https://acg.tikoplanet.com',

    // 二手市场站点域名
    secondHandAuth: 'http://localhost:3000/views/user/authorization',
  },
  development: {
    api: 'https://test.tikoplanet.com/acg',
    webUrl: 'https://acg.tikoplanet.com',

    // 二手市场站点域名
    secondHandAuth: 'https://acg-second-hand.tikoplanet.com/views/user/authorization',
  },
  production: {
    api: 'http://prevalent-special-edition.zmdna.com/acg',
    webUrl: 'http://prevalent-special-edition.zmdna.com',

    // 二手市场站点域名
    secondHandAuth: 'https://acg-used.tikoplanet.com/views/user/authorization',
  },
}

let defaultConfig = apiConfig.development

if (NODE_ENV === 'development') {
  if (startStatus === 'loca') {
    defaultConfig = apiConfig.localhost
  }
  if (startStatus === 'dev') {
    defaultConfig = apiConfig.development
  }
  if (startStatus === 'prod') {
    defaultConfig = apiConfig.production
  }
}

if (NODE_ENV === 'production') {
  if (buildStatus === 'dev') {
    defaultConfig = apiConfig.development
  }
  if (buildStatus === 'prod') {
    defaultConfig = apiConfig.production
  }
}

export default defaultConfig
