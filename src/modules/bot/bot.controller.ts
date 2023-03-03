import { Constants } from '../../constants'
import { Utils } from '../../utils'
import CatalogController from '../catalog/catalog.controller'
import BotService from './bot.service'

class BotController {
  private static instance: BotController
  private botService: BotService
  catalogController: CatalogController
  constructor() {
    this.botService = new BotService()
    this.catalogController = new CatalogController()
  }

  public static getInstance(): BotController {
    if (!BotController.instance) {
      BotController.instance = new BotController()
    }

    return BotController.instance
  }

  public async handleMessage(senderID: string, message: string) {
    console.log(message)
    if (this.botService.shouldSendGreeting(message)) {
      await this.botService.sendMessage(
        senderID,
        Constants.RANDOM_REPLIES[Utils.randomNumber(0, 2)]
      )
    } else if (message.startsWith('/')) {
      const args = message.slice(1).split(/ +/) //removes ! and split into array
      this.handleCommand(args, senderID)
    }
  }

  public async handleCommand(args: Array<string>, senderID: string) {
    const command = args[0].toLowerCase()
    const productSKU = +args[1]

    if (!Object.values(Constants.COMMAND).includes(command)) {
      await this.botService.sendMessage(
        senderID,
        'There is no such command as /' + command
      )
      return
    } else if (isNaN(productSKU)) {
      await this.botService.sendMessage(
        senderID,
        'Product SKU must be a number'
      )
      return
    }

    switch (command) {
      case Constants.COMMAND.DESC: {
        const res = await this.catalogController.getProduct(productSKU, 'desc')
        console.log(res?.description)
        await this.botService.sendMessage(
          senderID,
          res?.description || 'This product has no description'
        )
        break
      }
      case Constants.COMMAND.PRICE: {
        const res = await this.catalogController.getProduct(productSKU, 'price')
        await this.botService.sendMessage(
          senderID,
          res?.price.toString() || 'This product has no price'
        )
        break
      }
      case Constants.COMMAND.SHIPPING: {
        const res = await this.catalogController.getProduct(
          productSKU,
          'shipping'
        )
        await this.botService.sendMessage(
          senderID,
          res?.shipping.toString() || 'This product has no shipping price'
        )
        break
      }
    }
  }
}

export default BotController
