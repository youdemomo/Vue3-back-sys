<script lang='ts' setup>
    import { User, Lock } from '@element-plus/icons-vue'
    import { onMounted, reactive, ref } from 'vue'
    import { useUserStore } from '../../store/modules/user'
    import { useRouter } from 'vue-router'
    import { ElMessage, ElNotification } from 'element-plus'
    import { getTime } from '../../utils/time'

    const router = useRouter()
    // el-btn的加载效果
    const loading = ref(false)
    // 获取表单实例
    const formRef = ref(null)
    // 用户名的自定义校验
    const validatorUserName = (rule: any, value: any, callback: any) => {
        // rule：数组的校验规则对象
        // value：表单元素的文本内容
        // callback：符合条件放行，不符合注入错误信息
        if (/^[a-zA-Z0-9]{2,10}$/.test(value)) {
            callback()
        } else {
            callback(new Error('账号长度应在2到10位之间'))
        }
    }
    // 密码自定义校验
    const validatorPassword = (rule: any, value: any, callback: any) => {
        if (value.length >= 6) {
            callback()
        } else {
            callback(new Error('密码长度不能小于6位'))
        }
    }

    // todo: 登录
    const userStore = useUserStore()
    const loginForm = reactive({
        username: 'admin',
        password: '111111'
    })
    const login = async () => {
        // 校验未通过会返回拒绝的Promise
        await formRef.value.validate()
        loading.value = true
        try {
            // 登录成功后跳转
            await userStore.userLogin(loginForm)
            router.push('/')
            ElNotification({
                type: 'success',
                title: `嗨，${getTime()}`,
                message: '欢迎回来',
            })
            loading.value = false
        } catch (error) {
            ElNotification({
                type: 'error',
                message: (error as Error).message
            })
            loading.value = false
        }
    }

    // todo: 用户输入校验
    // 定义校验规则
    const rules = {
        username: [
            {
                required: true,
                message: '用户名不能为空',
                trigger: 'blur',
            },
            {
                trigger: 'change',
                validator: validatorUserName
            }
        ],
        password: [
            {
                required: true,
                message: '密码不能为空',
                trigger: 'blur',
            },
            {
                trigger: 'change',
                validator: validatorPassword
            }
        ],
    }

</script>

<template>
    <div class="login_container">
        <el-row>
            <!-- xs:屏幕小于728px时只显示表单 -->
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <el-form class="login-form" :model="loginForm" :rules="rules" ref="formRef">
                    <h1>你好</h1>
                    <h2>欢迎来到商品管理后台</h2>
                    <!-- 用户名 -->
                    <el-form-item prop="username">
                        <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <!-- 密码 -->
                    <el-form-item prop="password">
                        <el-input :prefix-icon="Lock" type="password" show-password
                            v-model="loginForm.password"></el-input>
                    </el-form-item>
                    <!-- 登录按钮 -->
                    <el-form-item>
                        <el-button class="login-btn" type="success" size="default" @click="login"
                            :loading="loading">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<style scoped lang="scss">
    .login_container {
        width: 100%;
        height: 100vh;
        background: url('../../assets/images/background.jpg') no-repeat;
        // 保证浏览器缩放的时候不会显示空白
        background-size: cover;

        .login-form {
            position: relative;
            width: 80%;
            top: 30vh;
            background: url('../../assets/images/login_form.png') no-repeat;
            background-size: cover;
            padding: 40px 54px;

            h1 {
                margin-left: -26px;
                color: white;
                font-size: 40px;
            }

            h2 {
                margin-left: -18px !important;
                color: white;
                font-size: 20px;
                margin: 20px 0;
            }

            .login-btn {
                width: 100%;
                background-color: #409eff;
                color: white
            }

            .login-btn:hover {
                width: 100%;
                background-color: #79bbff;
                color: white
            }
        }
    }
</style>