import { Constants } from '../../constants'
import catalogModel from '../../models/catalog.model'

class CatalogService {
  getProduct(sku: number, command: 'desc' | 'price' | 'shipping') {
    return catalogModel
      .findOne({
        sku,
      })
      .select(
        (() => {
          switch (command) {
            case Constants.COMMAND.DESC:
              return 'description'
            case Constants.COMMAND.PRICE:
              return 'price'
            case Constants.COMMAND.SHIPPING:
              return 'shipping'
          }
        })()
      )
  }
}
export default CatalogService
