import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '../store/modules/user'

// 创建axios实例
const request = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

// todo: 请求拦截器
// 传入的配置对象config，有许多与请求相关的信息
request.interceptors.request.use(config => {
  // 获取用户token
  const userStore = useUserStore()

  // token存在时拼接到请求头
  if (userStore.token) {
    config.headers.token = userStore.token
  }
  return config
})

// todo: 响应拦截器
request.interceptors.response.use(
  // bro: 响应成功回调
  // 简化返回的数据
  response => response.data,
  // bro: 响应失败回调
  error => {
    // 存储网络错误信息
    let message = ''
    // 存储状态码
    const status = error.response.status
    switch (status) {
      case 401:
        message = 'TOKEN过期啦'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址出错'
        break
      case 500:
        message = '服务器寄了'
        break
      default:
        message = '网络出错'
        break
    }
    // 弹出错误信息
    ElMessage({
      type: 'error',
      message,
    })

    return Promise.reject(error)
  },
)

export default request
