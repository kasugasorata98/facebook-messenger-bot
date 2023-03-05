import express, { Request, Response } from 'express'
import { config } from '../../../configs'
import { Constants } from '../../../constants'
import { WebHook } from '../../../entities/webhook.entity'
import logger from '../../../logger'
import BotController from '../../../modules/bot/bot.controller'
const router = express.Router()

router.post('/webhook', async (req: Request, res: Response) => {
  const logs = logger.createLogObject()
  logs.request = req.body
  const { object, entry: entries }: WebHook = req.body
  try {
    if (object === 'page') {
      for (const entry of entries) {
        const { id, time, messaging } = entry
        if (messaging) {
          for (const event of messaging) {
            if (!event.message || event.sender.id === Constants.SELF_ID) return
            const bot = BotController.getInstance()
            logs.traces.push('Handling Message')
            await bot.handleMessage(event.sender.id, event.message.text, logs)
            logs.traces.push('Handling Message Completed')
          }
        }
      }
    }
    logger.log(logs)
  } catch (err: any) {
    logs.traces.push({
      err,
      message: err?.message,
      code: err?.code,
    })
    logger.error(logs)
  } finally {
    res.sendStatus(200)
  }
})

router.get('/webhook', (req: Request, res: Response) => {
  const logs = logger.createLogObject()
  logs.endpoint = '/webhook'
  logs.request = req.query
  let mode = req.query['hub.mode']
  let token = req.query['hub.verify_token']
  let challenge = req.query['hub.challenge']

  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    // Check the mode and token sent is correct
    if (mode === 'subscribe' && token === config.webhookAccessToken) {
      // Respond with the challenge token from the request
      logs.traces.push('WEBHOOK_VERIFIED')
      logs.response = challenge
      logger.log(logs)
      res.status(200).send(challenge)
    } else {
      // Respond with '403 Forbidden' if verify tokens do not match
      logs.traces.push('Tokens do not match')
      logger.error(logs)
      res.sendStatus(403)
    }
  }
})

export default router
