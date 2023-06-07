import { AxiosService } from './axios.service'

class ProductService {
  async createProduct(data) {
    return AxiosService.post('/products/create', data)
  }
  async getSales(filter) {
    return AxiosService.post('/product/report', filter)
  }
}

export default new ProductService()
