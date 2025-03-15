// 用户相关仓库
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { reqLogin } from '../../api/user'
import type { loginForm } from '../../api/user/type'

export const useUserStore = defineStore(
  'User',
  () => {
    // todo: 存储用户token
    const token = ref('')

    // todo: 用户登录
    const userLogin = async (data: loginForm) => {
      const result = await reqLogin(data)
      if (result.code === 200) {
        token.value = result.data.token
        return 'ok'
      } else {
        // 传给登录组件错误信息
        return Promise.reject(new Error(result.data.message))
      }
    }

    return {
      token,
      userLogin,
    }
  },
  {
    persist: true,
  },
)
