// 用户相关仓库
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { reqLogin } from '../../api/user'
import type {
  loginForm,
  loginResponseData,
  menuRoutes,
} from '../../api/user/type'
import type { UserState } from './types/type'
// 引入路由
import { constantRoute } from '../../router/routes'

export const useUserStore = defineStore(
  'User',
  () => {
    // todo: 存储用户token
    const token: UserState = ref('')
    // todo: 存储路由数组
    const menuRoutes: menuRoutes = ref(constantRoute)

    // todo: 用户登录
    const userLogin = async (data: loginForm) => {
      const result: loginResponseData = await reqLogin(data)
      if (result.code === 200) {
        token.value = result.data.token as string
        return 'ok'
      } else {
        // 传给登录组件错误信息
        return Promise.reject(new Error(result.data.message))
      }
    }

    return {
      token,
      userLogin,
      menuRoutes,
    }
  },
  {
    persist: true,
  },
)
