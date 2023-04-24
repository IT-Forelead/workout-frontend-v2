import authHeader from '../mixins/auth-header'
import AxiosService from './axios.service'

class TrainerServicesService {
  async createTrainerService(data) {
    return AxiosService.post('/trainer-service/create', data, { headers: authHeader() })
  }
  async getAllTrainerServices() {
    return AxiosService.get('/trainer-service/all', { headers: authHeader() })
  }
  async getTrainerServicesByUserId(userId) {
    return AxiosService.get(`/trainer-service/${userId}`, { headers: authHeader() })
  }
}

export default new TrainerServicesService()
