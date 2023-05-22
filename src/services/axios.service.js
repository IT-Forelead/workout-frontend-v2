import axios from 'axios'
import { memorizedRefreshToken } from '../mixins/refresh.token.js'

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
// axios.defaults.withCredentials = true

/* ALL AXIOS REQUESTS */
axios.interceptors.request.use(
  async (config) => {
    const session = JSON.parse(localStorage.getItem('session'))

    if (session?.accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${session?.accessToken}`,
      }
    }

    return config
  },
  (error) => Promise.reject(error)
)

/* ALL AXIOS RESPONSES */
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config

    if (error?.response?.status === 403 && !config?.sent) {
      config.sent = true

      const result = await memorizedRefreshToken()

      if (result?.accessToken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${result?.accessToken}`,
        }
      }

      return axios(config)
    }
    return Promise.reject(error)
  }
)

export const PublicAxiosService = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
})
export const AxiosService = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})
