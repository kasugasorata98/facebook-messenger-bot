import { AxiosError, isAxiosError } from 'axios'
import { config } from '../../configs'
import AxiosClient from '../../lib/AxiosClient'
class BotService {
  constructor() {}

  public async sendMessage(id: string, message: string) {
    //'5835952803139760'
    const { data } = await AxiosClient.post(
      `https://graph.facebook.com/v12.0/me/messages?access_token=${config.webhookAccessToken}`,
      {
        recipient: {
          id,
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
