import { AxiosError, isAxiosError } from 'axios'
import { config } from '../../configs'
import { Constants } from '../../constants'
import AxiosClient from '../../lib/AxiosClient'
class BotService {
  constructor() {}

  public shouldSendGreeting(message: string): boolean {
    message = message.toLowerCase()
    let shouldSendGreeting = false
    for (const customerGreeting of Constants.CUSTOMER_GREETING) {
      if (message.startsWith(customerGreeting)) shouldSendGreeting = true
    }
    return shouldSendGreeting
  }

  public async sendMessage(recipientID: string, message: string) {
    const { data } = await AxiosClient.post(
      `https://graph.facebook.com/v12.0/me/messages?access_token=${config.webhookAccessToken}`,
      {
        recipient: {
          id: recipientID,
        },
        message: {
          text: message,
        },
      }
    )
    return data
  }
}

export default BotService
