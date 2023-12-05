import axios from 'axios'

import { ElMessage } from 'element-plus'

const instance = axios.create({
  baseURL: 'https://music-api-theta-one.vercel.app/',
  timeout: 10000
})

instance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    ElMessage.error(error.message || '请求失败, 请刷新重试')
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (res) => {
    return res
  },
  (error) => {
    ElMessage.error(error.message || '请求失败, 请刷新重试')
    return Promise.reject(error)
  }
)

export default instance
