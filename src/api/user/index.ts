// 用户相关接口
import request from '@/utils/request'

// 枚举接口地址
enum API {
  LOGIN_URL = '/acl/user/login',
  USERINFO_URL = '/acl/user/info',
  // 没有这个接口辣！清空本地存储的Token就当作退出登录了吧
  // LOGOUT_URL = '/admin/acl/logout',
}

// todo: 登录
export const reqLogin = (data: any) =>
  request({
    url: API.LOGIN_URL,
    method: 'POST',
    data,
  })

// todo: 获取用户信息
export const reqUserInfo = () =>
  request({
    url: API.USERINFO_URL,
  })

// todo: 退出登录
// export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)
