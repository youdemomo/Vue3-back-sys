// 用户相关接口
import request from '@/utils/request'
import type { loginForm, loginResponseData, userResponseData } from './type.ts'

// 统一管理接口
enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = 'user/info',
}

// 暴露请求函数

// todo: 登录
export const reqLogin = (data: loginForm) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data)

// todo: 获取用户信息
export const reqUserInfo = () =>
  request.get<any, userResponseData>(API.USERINFO_URL)
