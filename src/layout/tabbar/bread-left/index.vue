<script lang='ts' setup name="BreadLeft">
    import { inject, ref } from 'vue';
    import { useRoute } from 'vue-router';

    // todo: 图标切换
    const fold = ref(false)
    // 获取layout组件传来的函数
    const provideFold = inject('getIsFold')
    const changeIcon = () => {
        fold.value = !fold.value
        provideFold(fold.value)
    }

    // todo: 路由渲染面包屑
    const route = useRoute()
</script>

<template>
    <!-- 展开收起图标 -->
    <el-icon style="margin:0 26px;" @click="changeIcon">
        <Expand v-if="fold" />
        <Fold v-else></Fold>
    </el-icon>
    <!-- 面包屑 -->
    <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="item in route.matched" :key="item.path" :to="item.path" v-show="item.meta.title">
            <!-- 面包屑图标 -->
            <el-icon style="margin-right: 6px;">
                <component :is="item.meta.icon" style="margin-top: 2px;"></component>
            </el-icon>
            <!-- 面包屑标题 -->
            <span> {{ item.meta.title }}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<style scoped></style>