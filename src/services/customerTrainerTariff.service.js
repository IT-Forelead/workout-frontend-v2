import authHeader from '../mixins/auth-header'
import AxiosService from './axios.service'

class CustomerTrainerTariffService {
  async createCustomerTrainerTariff(data) {
    return AxiosService.post('/trainer-tariff/create', data, { headers: authHeader() })
  }
  async getCustomerTrainerTariffs(filter) {
    return AxiosService.post('/trainer-tariff/report', filter, { headers: authHeader() })
  }
}

export default new CustomerTrainerTariffService()
