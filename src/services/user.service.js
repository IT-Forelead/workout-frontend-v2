import { AxiosService, PublicAxiosService } from './axios.service'

class UserService {
  async createUser(data) {
    return AxiosService.post('/user/create', data)
  }
  async getUsers(filter) {
    return AxiosService.post('/user/report', filter)
  }
  async deleteUser(userId) {
    return AxiosService.get(`/user/delete/${userId}`)
  }
  async getUsersTotal(filter) {
    return PublicAxiosService.post('/user/total', filter)
  }
}

export default new UserService()
