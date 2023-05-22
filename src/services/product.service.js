import authHeader from '../mixins/auth-header'
import AxiosService from './axios.service'

class ProductService {
  async createSaleProduct(data) {
    return AxiosService.post('/product/create', data, { headers: authHeader() })
  }
  async getSales(filter) {
    return AxiosService.post('/product/report', filter, { headers: authHeader() })
  }
}

export default new ProductService()
