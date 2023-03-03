import { config } from '../../configs'
import { Constants } from '../../constants'
import { Utils } from '../../utils'
import CatalogController from '../catalog/catalog.controller'
import SendMailController from '../sendmail/sendmail.controller'
import BotService from './bot.service'

class BotController {
  private static instance: BotController
  private botService: BotService
  catalogController: CatalogController
  sendmailController: SendMailController
  constructor() {
    this.botService = new BotService()
    this.catalogController = new CatalogController()
    this.sendmailController = new SendMailController()
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
        const res = await this.catalogController.getProduct(
          productSKU,
          'description'
        )
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
      case Constants.COMMAND.BUY: {
        const product = await this.catalogController.getProduct(productSKU)
        if (!product)
          return await this.botService.sendMessage(
            senderID,
            'Product does not exist'
          )
        await this.sendmailController.sendMail({
          subject: 'BUY ORDER FROM ' + senderID,
          text: '',
          html: `
          <table style="border-collapse: collapse; width: 100%;">
            <thead>
              <tr style="background-color: #ccc;">
                <th style="padding: 10px; text-align: left;">SKU</th>
                <th style="padding: 10px; text-align: left;">NAME</th>
                <th style="padding: 10px; text-align: left;">TYPE</th>
                <th style="padding: 10px; text-align: left;">PRICE</th>
                <th style="padding: 10px; text-align: left;">UPC</th>
                <th style="padding: 10px; text-align: left;">SHIPPING</th>
                <th style="padding: 10px; text-align: left;">DESCRIPTION</th>
                <th style="padding: 10px; text-align: left;">MANUFACTURER</th>
                <th style="padding: 10px; text-align: left;">MODEL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 10px;">${product?.sku}</td>
                <td style="padding: 10px;">${product?.name}</td>
                <td style="padding: 10px;">${product?.type}</td>
                <td style="padding: 10px;">$${product?.price}</td>
                <td style="padding: 10px;">${product?.upc}</td>
                <td style="padding: 10px;">$${product?.shipping}</td>
                <td style="padding: 10px;">${product?.description}</td>
                <td style="padding: 10px;">${product?.manufacturer}</td>
                <td style="padding: 10px;">${product?.model}</td>
              </tr>
            </tbody>
            </table>
          `,
        })
        break
      }
    }
  }
}

export default BotController
