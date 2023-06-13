import { AxiosService } from './axios.service'

class ProductHistoryService {
  async createProductHistory(data) {
    return AxiosService.post('/product-history/create', data)
  }
  async getProductHistories(filter) {
    return AxiosService.post('/product-history/report', filter)
  }
}

export default new ProductHistoryService()
