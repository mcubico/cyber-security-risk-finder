import axios from "axios"
import { refreshAccessToken } from "../services/auth-api.service"

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL_BASE,
  withCredentials: true
})

axiosInstance.defaults.headers.common['Content-Type'] = 'application/json'

/**
 * Interceptor used to validate JWT access token expiration
 */
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    const errMessage = error.response.data.message as string
    if (errMessage.includes('Access token expired') && !originalRequest._retry) {
      originalRequest._retry = true
      await refreshAccessToken()

      return axiosInstance(originalRequest)
    }

    return Promise.reject(error)
  }
)

export default axiosInstance