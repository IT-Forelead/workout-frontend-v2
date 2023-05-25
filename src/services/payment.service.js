import { AxiosService } from './axios.service'

class PaymentService {
  async createPayment(data) {
    return AxiosService.post('/payment/create', data)
  }
  async getPayments(filter) {
    return AxiosService.post('/payment/report', filter)
  }
}

export default new PaymentService()
