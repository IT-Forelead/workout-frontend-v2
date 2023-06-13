import { AxiosService } from './axios.service'

class ProductService {
  async createProduct(data) {
    return AxiosService.post('/product/create', data)
  }
  async getProducts(filter) {
    return AxiosService.post('/product/report', filter)
  }
}

export default new ProductService()
