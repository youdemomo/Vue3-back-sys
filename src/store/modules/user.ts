// 用户相关仓库
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { reqLogin, reqUserInfo } from '../../api/user'
import type { loginFormData, loginResData, userInfoData } from '../../api/user/type'
// 引入路由
import { constantRoute } from '../../router/routes'

export const useUserStore = defineStore(
    'User',
    () => {
        // bro: 存储路由数组
        const menuRoutes = ref(constantRoute)

        // bro: 存储用户token
        const token: string = ref('')

        // todo: 用户登录
        const userLogin = async (data: loginFormData) => {
            const result: loginResData = await reqLogin(data)
            // console.log(result)

            if (result.code === 200) {
                token.value = result.data as string
                return 'ok'
            } else {
                // 传给登录组件错误信息
                return Promise.reject(new Error(result.data))
            }
        }

        // bro: 存储用户名
        const username = ref('')
        const avatar = ref('')

        // todo: 获取用户信息
        const getUserInfo = async () => {
            const result: userInfoData = await reqUserInfo()
            // console.log(result)

            if (result.code === 200) {
                username.value = result.data.name
                avatar.value = result.data.avatar
                return 'ok'
            } else {
                return Promise.reject(new Error(result.message))
            }
        }

        // todo: 退出登录
        const userLogout = () => {
            token.value = ''
            username.value = ''
            avatar.value = ''
        }

        return {
            token,
            userLogin,
            menuRoutes,
            getUserInfo,
            username,
            avatar,
            userLogout,
        }
    },
    {
        persist: [
            {
                // 仅持久化pick数组中的数据到localStorage
                pick: ['token', 'username', 'avatar'],
                storage: localStorage,
            },
        ],
    },
)
