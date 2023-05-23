import { AxiosService } from './axios.service'

class SmsMessageService {
  async getSmsMessages(filter) {
    return AxiosService.post('/message/report', filter)
  }
}

export default new SmsMessageService()
