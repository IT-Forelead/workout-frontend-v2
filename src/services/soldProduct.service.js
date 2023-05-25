import { AxiosService } from './axios.service'

class SoldProductService {
  async createSaleProduct(data) {
    return AxiosService.post('/product/create', data)
  }
  async getSales(filter) {
    return AxiosService.post('/product/report', filter)
  }
}

export default new SoldProductService()
