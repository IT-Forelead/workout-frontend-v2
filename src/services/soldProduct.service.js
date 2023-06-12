import { AxiosService } from './axios.service'

class SoldProductService {
  async createSaleProduct(data) {
    return AxiosService.post('/sold-product/create', data)
  }
  async getSales(filter) {
    return AxiosService.post('/sold-product/report', filter)
  }
}

export default new SoldProductService()
