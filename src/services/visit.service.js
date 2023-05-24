import { AxiosService } from './axios.service'

class VisitService {
  async createVisit(data) {
    return AxiosService.post('/visit/create', data)
  }
  async getVisits(filter) {
    return AxiosService.post('/visit/report', filter)
  }
  async getNumberOfDailyVisit() {
    return AxiosService.get('/visit/daily-visits')
  }
}

export default new VisitService()
