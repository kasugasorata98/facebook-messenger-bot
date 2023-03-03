import { Constants } from '../../constants'
import CatalogService from './catalot.service'

class CatalogController {
  private catalogService: CatalogService
  constructor() {
    this.catalogService = new CatalogService()
  }
  getProduct(sku: number, select: string | null = null) {
    return this.catalogService.getProduct(sku, select)
  }
}
export default CatalogController
