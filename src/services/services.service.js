import authHeader from '../mixins/auth-header'
import AxiosService from './axios.service'

class ServicesService {
  async createService(data) {
    return AxiosService.post('/service/create', data, { headers: authHeader() })
  }
  async getServices(filter) {
    return AxiosService.post('/service/report', filter, { headers: authHeader() })
  }
  async getAllServices() {
    return AxiosService.get('/service/all', { headers: authHeader() })
  }
  async editService(data) {
    return AxiosService.post('/service/edit', data, { headers: authHeader() })
  }
  async deleteService(serviceId) {
    return AxiosService.get(`/service/delete/${serviceId}`, { headers: authHeader() })
  }
}

export default new ServicesService()
