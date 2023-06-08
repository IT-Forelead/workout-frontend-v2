import { AxiosService } from './axios.service'

class ProductService {
  async createProduct(data) {
    return AxiosService.post('/products/create', data)
  }
  async getProducts(filter) {
    return AxiosService.post('/products/report', filter)
  }
}

export default new ProductService()
