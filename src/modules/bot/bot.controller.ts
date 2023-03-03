import { Constants } from '../../constants'
import { Utils } from '../../utils'
import BotService from './bot.service'

class BotController {
  private static instance: BotController
  private botService: BotService
  constructor() {
    this.botService = new BotService()
  }

  public static getInstance(): BotController {
    if (!BotController.instance) {
      BotController.instance = new BotController()
    }

    return BotController.instance
  }

  public async handleMessage(senderID: string, message: string) {
    if (this.botService.shouldSendGreeting(message)) {
      await this.botService.sendMessage(
        senderID,
        Constants.RANDOM_REPLIES[Utils.randomNumber(0, 2)]
      )
    }
  }
}

export default BotController
