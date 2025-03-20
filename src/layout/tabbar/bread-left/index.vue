<script lang='ts' setup name="BreadLeft">
    import { inject, ref } from 'vue';

    // 用于图标切换
    const fold = ref(false)
    // 获取layout组件传来的函数
    const provideFold = inject('getIsFold')
    const changeIcon = () => {
        fold.value = !fold.value
        provideFold(fold.value)
    }
</script>

<template>
    <!-- 展开收起图标 -->
    <el-icon style="margin:0 26px;" @click="changeIcon">
        <Expand v-if="fold" />
        <Fold v-else></Fold>
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