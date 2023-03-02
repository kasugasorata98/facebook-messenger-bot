import { Config } from './index'

const development = (): Config => {
  return {
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || '',
    mongoDBString: process.env.MONGODB_CONNECTION_STRING || '',
    appSecret: process.env.APP_SECRET || '',
    webhookAccessToken: process.env.WEBHOOK_ACCESS_TOKEN || '',
  }
}

export default development
