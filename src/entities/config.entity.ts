export interface Config {
  port: string
  mongoDBString: string
  environment: string
  appSecret: string
  webhookAccessToken: string
  sendgridApiKey: string
  verifiedEmailSender: string
  receiverEmail: string
}
