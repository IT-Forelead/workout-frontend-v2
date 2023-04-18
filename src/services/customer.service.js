import authHeader from '../mixins/auth-header'
import AxiosService from './axios.service'

class CustomerService {
  async createCustomer(data) {
    return AxiosService.post('/customer/create', data, { headers: authHeader() })
  }
  async getCustomers(filter) {
    return AxiosService.post('/customer/report', filter, { headers: authHeader() })
  }
}

export default new CustomerService()
