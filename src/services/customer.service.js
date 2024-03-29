import { AxiosService, PublicAxiosService } from './axios.service'

class CustomerService {
  async createCustomer(data) {
    return AxiosService.post('/customer/create', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
  async create(data) {
    return PublicAxiosService.post('/customer/register', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
  async sendVerifyCode(phone) {
    return AxiosService.get(`/customer/verify-code?phone=${encodeURIComponent(phone)}`)
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
  async getCustomersInGym() {
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
  async getCustomersTotal(filter) {
    return PublicAxiosService.post('/customer/total', filter)
  }
  async getNumberOfCustomersInGym() {
    return PublicAxiosService.get('/customer/customers-in-gym')
  }
}

export default new CustomerService()
