import { NextFunction, Request, Response } from 'express'
import crypto from 'crypto'
import { config } from '../configs'

export function verifyRequestSignature(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let signature = req.headers['x-hub-signature']
  if (!signature) {
    //throw new Error('Could not verify signature')
    return res.status(403).json({
      message: 'Could Not Verify Signature',
    })
  }
  if (Array.isArray(signature)) signature = signature[0]

  const [algo, hash] = signature.split('=')
  const expectedHash = crypto
    .createHmac(algo, config.appSecret)
    .update(req.body)
    .digest('hex')

  if (hash !== expectedHash) {
    return res.status(403).json({
      message: 'Invalid Signature',
    })
  }
  next()
}
