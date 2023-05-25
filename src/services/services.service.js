import { AxiosService } from './axios.service'

class ServicesService {
  async createService(data) {
    return AxiosService.post('/service/create', data)
  }
  async getServices(filter) {
    return AxiosService.post('/service/report', filter)
  }
  async getAllServices() {
    return AxiosService.get('/service/all')
  }
  async editService(data) {
    return AxiosService.post('/service/edit', data)
  }
  async deleteService(serviceId) {
    return AxiosService.get(`/service/delete/${serviceId}`)
  }
}

export default new ServicesService()
