<script lang='ts' setup>
    import { User, Lock } from '@element-plus/icons-vue'
    import { reactive } from 'vue';

    // todo: 登录
    const loginForm = reactive({
        username: 'admin',
        password: '111111'
    })
</script>

<template>
    <div class="login_container">
        <el-row>
            <!-- xs:屏幕小于728px时只显示表单 -->
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <el-form class="login-form">
                    <h1>你好</h1>
                    <h2>欢迎来到商品管理后台</h2>
                    <el-form-item>
                        <!-- 用户名 -->
                        <el-input class="user-input" :prefix-icon="User" v-model="loginForm.username"></el-input>
                        <!-- 密码 -->
                        <el-input :prefix-icon="Lock" type="password" show-password
                            v-model="loginForm.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <!-- 登录按钮 -->
                        <el-button class="login-btn" type="success" size="default">登录</el-button>
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
            padding: 40px;
            padding-bottom: 30px;

            h1 {
                color: white;
                font-size: 40px;
            }

            h2 {
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

            .user-input {
                margin-bottom: 10px;
            }
        }
    }
</style>