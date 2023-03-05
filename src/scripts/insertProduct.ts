import MongooseClient from '../lib/MongooseClient'
import catalogModel from '../models/catalog.model'
import products from '../dump/products.json'

MongooseClient.connect('mongodb://127.0.0.1:27017/messengerbot')
  .then(async res => {
    console.log('MongoDB connected to ' + res.connections[0].name)
    for (const product of Object.values(products)) {
      const catalog = await catalogModel.create(product)
      console.log('SKU: ' + catalog.sku)
    }
    console.log('Done')
  })
  .catch(err => {
    console.log(err)
  })
