<script lang='ts' setup>

</script>

<template>
    <!-- 展开收起图标 -->
    <el-icon style="margin:0 26px;">
        <Expand />
    </el-icon>
    <!-- 面包屑 -->
    <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }">权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>
            <a href="/">用户管理</a>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<style scoped></style>