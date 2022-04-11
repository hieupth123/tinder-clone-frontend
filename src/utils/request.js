import axios from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: false,
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers['app-id'] = process.env.VUE_APP_APP_ID
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

export default service
