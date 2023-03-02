import express, { Request, Response } from 'express'
import cors from 'cors'
import glob from 'glob'
import { config } from './src/configs'
import AxiosClient from './src/lib/AxiosClient'
import { AxiosError, isAxiosError } from 'axios'
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
  console.log(routerPaths)
  const routes = await Promise.all(
    routerPaths.map(async routerPath => {
      const module = await import(`.\\${routerPath}`)
      return module.default
    })
  )

  app.get('/', (_: Request, res: Response) => {
    res.json('Health Check: Ok')
  })

  routes.forEach(route => {
    app.use('/api/v1', route)
  })

  app.listen(config.port || 3000, () => {
    console.log('App listening at port: ' + (config.port || 3000))
  })

  //   AxiosClient.post(
  //     `https://graph.facebook.com/v12.0/me/messages?access_token=${config.webhookAccessToken}`,
  //     {
  //       recipient: {
  //         id: '5835952803139760',
  //       },
  //       message: {
  //         text: 'hello',
  //       },
  //     }
  //   )
  //     .then(response => {
  //       console.log('Message sent successfully:', response.data)
  //     })
  //     .catch((error?: AxiosError | any) => {
  //       if (isAxiosError(error)) {
  //         console.error('Error sending message:', error?.response?.data)
  //       } else console.error(error)
  //     })
}

main()
