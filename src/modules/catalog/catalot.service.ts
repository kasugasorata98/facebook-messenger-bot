import { Constants } from '../../constants'
import catalogModel from '../../models/catalog.model'

class CatalogService {
  getProduct(sku: number, select: string | null) {
    return catalogModel
      .findOne({
        sku,
      })
      .select(select)
  }
}
export default CatalogService
