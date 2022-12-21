const NODE_ENV = process.env.NODE_ENV

// 启用钥匙 dev 正式 prod 测试
// const startStatus = 'dev'
const startStatus = 'dev'

const buildStatus = 'prod'
// const buildStatus = 'dev'

const apiConfig = {
  localhost: {
    api: 'https://test.xxx.com/acg',
    webUrl: 'https://acg.xxx.com',
  },
  development: {
    api: 'https://test.xxx.com/acg',
    webUrl: 'https://acg.xxx.com',
  },
  production: {
    api: 'http://prevalent-special-edition.xxx.com/acg',
    webUrl: 'http://prevalent-special-edition.xxx.com',
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
