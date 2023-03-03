import { Constants } from '../../constants'
import CatalogService from './catalot.service'

class CatalogController {
  private catalogService: CatalogService
  constructor() {
    this.catalogService = new CatalogService()
  }
  getProduct(sku: number, command: 'desc' | 'price' | 'shipping') {
    return this.catalogService.getProduct(sku, command)
  }
}
export default CatalogController
