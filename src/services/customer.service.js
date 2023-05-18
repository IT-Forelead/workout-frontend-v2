import authHeader from '../mixins/auth-header'
import authHeaderForMultipart from '../mixins/auth-header-for-multipart'
import AxiosService from './axios.service'

class CustomerService {
  async createCustomer(data) {
    return AxiosService.post('/customer/create', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: authHeaderForMultipart(),
      },
    })
  }
  async editCustomer(data) {
    return AxiosService.post('/customer/edit', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: authHeaderForMultipart(),
      },
    })
  }
  async getCustomers(filter) {
    return AxiosService.post('/customer/report', filter, { headers: authHeader() })
  }
  async sendActivationCode(phone) {
    return AxiosService.get(`/customer/sent-code?phone=${encodeURIComponent(phone)}`, { headers: authHeader() })
  }
  async addQrCodeToCustomer(customerId) {
    return AxiosService.get(`/customer/add-qrcode/${customerId}`, { headers: authHeader() })
  }
}

export default new CustomerService()
