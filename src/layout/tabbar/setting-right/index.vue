<script lang='ts' setup>

</script>

<template>
    <!-- 三个按钮 -->
    <el-button type="primary" icon="Refresh" circle />
    <el-button type="primary" icon="FullScreen" circle />
    <el-button type="primary" icon="Setting" circle />
    <!-- 用户头像 -->
    <img src="../../../assets/icons/cap.svg" alt=""
        style="height: 24px; width: 24px; margin: 0 14px; margin-left: 24px;">
    <!-- 下拉菜单 -->
    <el-dropdown style="margin-right:26px;">
        <span class="el-dropdown-link">
            admin
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