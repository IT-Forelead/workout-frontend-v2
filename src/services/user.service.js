import { AxiosService } from './axios.service'

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
}

export default new UserService()
