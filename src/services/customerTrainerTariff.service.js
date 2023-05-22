import { AxiosService } from './axios.service'

class CustomerTrainerTariffService {
  async createCustomerTrainerTariff(data) {
    return AxiosService.post('/trainer-tariff/create', data)
  }
  async getCustomerTrainerTariffs(filter) {
    return AxiosService.post('/trainer-tariff/report', filter)
  }
}

export default new CustomerTrainerTariffService()
