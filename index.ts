import express, { Request, Response } from 'express'
import cors from 'cors'
import glob from 'glob'
import { config } from './src/configs'
import MongooseClient from './src/lib/MongooseClient'
import logger from './src/logger'

const app = express()

async function main() {
  app.use(cors())
  app.use(express.json())
  app.use(
    express.urlencoded({
      extended: true,
    })
  )

  const routerPaths = glob.globSync('./src/api/v1/**/*.ts')
  logger.log({
    routerPaths,
  })
  const routes = await Promise.all(
    routerPaths.map(async routerPath => {
      const module = await import(`.\\${routerPath}`)
      return module.default
    })
  )

  app.get('/', (_: Request, res: Response) => {
    logger.log({
      endpoint: '/',
      response: 'Ok',
    })
    res.json('Health Check: Ok')
  })

  routes.forEach(route => {
    app.use('/api/v1', route)
  })
  MongooseClient.connect(config.mongoDBString)
    .then(async res => {
      logger.log('MongoDB connected to ' + res.connections[0].name)
      app.listen(config.port || 3000, () => {
        logger.log('App listening at port: ' + (config.port || 3000))
      })
    })
    .catch(err => {
      logger.error({
        err,
        message: err?.message,
        code: err?.code,
      })
    })
}

main()
