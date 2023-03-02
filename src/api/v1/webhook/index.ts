import express, { Request, Response } from 'express'
import { config } from '../../../configs'
import { WebHook } from '../../../entities/webhook.entities'
const router = express.Router()

router.post('/webhook', async (req: Request, res: Response) => {
  const body = req.body
  const { object, entry }: WebHook = body

  if (object === 'page') {
    entry.forEach(entry => {
      const { id, time, messaging } = entry
      messaging?.forEach(event => {
        if (!event.message) return
        console.log(event)
        if (event.message) {
          // Handle message event
        } else if (event.postback) {
          // Handle postback event
        } else if (event.delivery) {
          // Handle delivery confirmation event
        }
      })
    })
  }

  res.sendStatus(200)
})

router.get('/webhook', (req: Request, res: Response) => {
  console.log({
    get: req.body,
  })
  // Parse the query params
  let mode = req.query['hub.mode']
  let token = req.query['hub.verify_token']
  let challenge = req.query['hub.challenge']

  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    // Check the mode and token sent is correct
    if (mode === 'subscribe' && token === config.webhookAccessToken) {
      // Respond with the challenge token from the request
      console.log('WEBHOOK_VERIFIED')
      res.status(200).send(challenge)
    } else {
      // Respond with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403)
    }
  }
})

export default router
