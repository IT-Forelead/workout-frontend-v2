import authHeader from '../mixins/auth-header'
import AxiosService from './axios.service'

class CustomerTariffService {
  async createCustomerTariff(data) {
    return AxiosService.post('/tariff/create', data, { headers: authHeader() })
  }
  async getCustomerTariffs(filter) {
    return AxiosService.post('/tariff/report', filter, { headers: authHeader() })
  }
}

export default new CustomerTariffService()
