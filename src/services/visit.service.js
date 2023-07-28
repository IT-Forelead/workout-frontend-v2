import { AxiosService, PublicAxiosService } from './axios.service'

class VisitService {
  async createVisit(data) {
    return AxiosService.post('/visit/create', data)
  }
  async createFakeVisit(data) {
    return AxiosService.post('/visit/create-fake-visit', data)
  }
  async getVisits(filter) {
    return AxiosService.post('/visit/report', filter)
  }
  async getNumberOfDailyVisit() {
    return PublicAxiosService.get('/visit/daily-visits')
  }
  async getNumberOfFewWeeksVisits() {
    return PublicAxiosService.get('/visit/weeks-visits')
  }
  async getNumberOfFewMonthsVisits() {
    return PublicAxiosService.get('/visit/last-few-month')
  }
}

export default new VisitService()
