// 用户相关ts类型

// todo: 登录接口传参类型限制
export interface loginFormData {
  username: string
  password: string
}

// todo: 定义全部接口返回数据的公共ts类型
interface resData {
  code: number
  message: string
  success: boolean
}

// todo: 登录接口返回限制
export interface loginResData extends resData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
  }
}

// todo: 获取用户信息返回限制
export interface userInfoData extends resData {
  data: object
}
