<script lang='ts' setup name="Menu">
    import { useRouter } from 'vue-router';

    // 接受组件使用者传来的路由数组
    const props = defineProps(['menuList'])
    const router = useRouter()

    // 点击彩菜单组件时跳转路由
    const goRoute = (el_item: any) => {
        // 通过获得menu-item绑定的index进行路由跳转
        // console.log(el_item);
        router.push(el_item.index)
    }
</script>

<template>
    <template v-for="item in menuList" :key="item.path">
        <!-- 没有子路由，直接渲染 -->
        <el-menu-item v-if="!item.children && item.meta.isShow" :index="item.path" @click="goRoute">
            <template #title>
                <!-- 图标，传入图标名 -->
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
        </el-menu-item>

        <!-- 只有一个子路由，则将这个子路由渲染出来 -->
        <el-menu-item v-if="item.children && item.children.length === 1 && item.meta.isShow"
            :index="item.children[0].path" @click="goRoute">
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                {{ item.children[0].meta.title }}
            </template>
        </el-menu-item>

        <!-- 有多个子路由 -->
        <el-sub-menu v-if="item.children && item.children.length > 1 && item.meta.isShow" :index="item.path">
            <!-- 顶级菜单标题 -->
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
            <!-- 递归传入chilren数组，保证能渲染出多级路由的children -->
            <Menu :menuList="item.children"></Menu>
        </el-sub-menu>
    </template>


</template>

<style scoped></style>