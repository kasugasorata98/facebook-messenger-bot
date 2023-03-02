import winston from 'winston'
import { Utils } from '../utils'

const Logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
})

if (Utils.isProd()) {
  Logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  )
}

export default Logger
