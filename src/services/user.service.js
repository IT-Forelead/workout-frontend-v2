import authHeader from '../mixins/auth-header'
import AxiosService from './axios.service'

class UserService {
  async createUser(data) {
    return AxiosService.post('/user/create', data, { headers: authHeader() })
  }
  async getUsers(filter) {
    return AxiosService.post('/user/report', filter, { headers: authHeader() })
  }
}

export default new UserService()
