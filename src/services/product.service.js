import { AxiosService } from './axios.service'

class ProductService {
  async createProduct(data) {
    return AxiosService.post('/product/create', data)
  }
  async getProducts(filter) {
    return AxiosService.post('/product/report', filter)
  }
  async editProduct(data) {
    return AxiosService.post('/product/edit', data)
  }
  async deleteProduct(productId) {
    return AxiosService.get(`/product/delete/${productId}`)
  }
}

export default new ProductService()
