<script lang='ts' setup name="SettingRight">
    import { useUserStore } from '../../../store/modules/user';
    import { emitter } from '../../../utils/emitter';
    import { ref } from 'vue';


    // todo: 刷新按钮回调
    const refsh = ref(false)
    const refreshMain = () => {
        refsh.value = !refsh.value
        // 触发Main组件绑定的send-refsh事件，通知Main组件刷新
        emitter.emit('send-refsh', refsh.value)
    }

    // todo: 全屏按钮回调
    const fullScreen = () => {
        // 全屏返回true，否则返回null
        let full = document.fullscreenElement

        if (full) {
            // 退出全屏
            document.exitFullscreen()
        } else {
            // 进入全屏
            document.documentElement.requestFullscreen()
        }
    }

    // todo: 获取登录用户信息
    const userStore = useUserStore()

</script>

<template>
    <!-- 三个按钮 -->
    <el-button type="primary" icon="Refresh" circle @click="refreshMain" />
    <el-button type="primary" icon="FullScreen" circle @click="fullScreen" />
    <el-button type="primary" icon="Setting" circle />
    <!-- 用户头像 -->
    <img :src="userStore.avatar" alt=""
        style="height: 36px; width: 36px; margin: 0 14px; margin-left: 24px; border-radius: 50%;">
    <!-- 下拉菜单 -->
    <el-dropdown style="margin-right:26px;">
        <span class="el-dropdown-link">
            {{ userStore.username }}
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<style scoped></style>