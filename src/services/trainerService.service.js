import { AxiosService } from './axios.service'

class TrainerServicesService {
  async createTrainerService(data) {
    return AxiosService.post('/trainer-service/create', data)
  }
  async getTrainerServices(filter) {
    return AxiosService.post('/trainer-service/report', filter)
  }
  async getAllTrainerServices() {
    return AxiosService.get('/trainer-service/all')
  }
  async getTrainerServicesByUserId(userId) {
    return AxiosService.get(`/trainer-service/${userId}`)
  }
  async deleteTrainerService(serviceId) {
    return AxiosService.get(`/trainer-service/delete/${serviceId}`)
  }
}

export default new TrainerServicesService()
