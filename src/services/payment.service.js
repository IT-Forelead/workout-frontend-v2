import authHeader from '../mixins/auth-header'
import AxiosService from './axios.service'

class PaymentService {
  async createPayment(data) {
    return AxiosService.post('/payment/create', data, { headers: authHeader() })
  }
  async getPayments(filter) {
    return AxiosService.post('/payment/report', filter, { headers: authHeader() })
  }
}

export default new PaymentService()
