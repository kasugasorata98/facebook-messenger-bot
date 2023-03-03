import { Config } from '../entities/config.entity'

const staging = (): Config => {
  return {
    environment: process.env.NODE_ENV || 'staging',
    port: process.env.PORT || '',
    mongoDBString: process.env.MONGODB_CONNECTION_STRING || '',
    appSecret: process.env.APP_SECRET || '',
    webhookAccessToken: process.env.WEBHOOK_ACCESS_TOKEN || '',
    sendgridApiKey: process.env.SENDGRID_API_KEY || '',
    verifiedEmailSender: process.env.VERIFIED_SENDER_EMAIL || '',
    receiverEmail: process.env.RECEIVER_EMAIL || '',
  }
}

export default staging
