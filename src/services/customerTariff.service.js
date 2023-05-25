import { AxiosService } from './axios.service'

class CustomerTariffService {
  async createCustomerTariff(data) {
    return AxiosService.post('/tariff/create', data)
  }
  async getCustomerTariffs(filter) {
    return AxiosService.post('/tariff/report', filter)
  }
}

export default new CustomerTariffService()
