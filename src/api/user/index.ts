// 用户相关接口
import request from '@/utils/request'

// 枚举接口地址
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}

// todo: 登录
export const reqLogin = (data: any) => request.post<any, any>(API.LOGIN_URL)

// todo: 获取用户信息
export const reqUserInfo = () => request.get(API.USERINFO_URL)

// todo: 退出登录
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)
