import { AxiosService } from './axios.service'

class CustomerService {
  async createCustomer(data) {
    return AxiosService.post('/customer/create', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
  async editCustomer(data) {
    return AxiosService.post('/customer/edit', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
  async getCustomers(filter) {
    return AxiosService.post('/customer/report', filter)
  }
  async getCustomersNowAt() {
    return AxiosService.get('/customer/all-now')
  }
  async sendActivationCode(phone) {
    return AxiosService.get(`/customer/sent-code?phone=${encodeURIComponent(phone)}`)
  }
  async addQrCodeToCustomer(customerId) {
    return AxiosService.get(`/customer/add-qrcode/${customerId}`)
  }
  async deleteCustomer(customerId) {
    return AxiosService.get(`/customer/delete/${customerId}`)
  }
}

export default new CustomerService()
