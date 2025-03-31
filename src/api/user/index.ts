// 用户相关接口
import request from '@/utils/request'
import type { loginFormData, loginResData, userInfoData } from './type'

// 枚举接口地址
enum API {
  LOGIN_URL = '/acl/user/login',
  USERINFO_URL = '/acl/user/info',
  // 没有这个接口辣！手动清除pinia数据模拟完成
  // LOGOUT_URL = '/admin/acl/logout',
}

// todo: 登录
export const reqLogin = (data: loginFormData) =>
  request<any, loginResData>({
    url: API.LOGIN_URL,
    method: 'POST',
    data,
  })

// todo: 获取用户信息
export const reqUserInfo = () =>
  request<any, userInfoData>({
    url: API.USERINFO_URL,
  })

// todo: 退出登录
// export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)
