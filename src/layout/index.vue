<script lang='ts' setup name="Layout">
    // logo组件
    import Logo from './Logo/index.vue'
    // 左侧菜单组件
    import Menu from './Menu/index.vue'
    // 顶部导航栏
    import Tabbar from './tabbar/index.vue'
    // 获取路由数组
    import { useUserStore } from '../store/modules/user';
    // 封装二级路由出口
    import Main from './Main/index.vue'
    import { useRoute } from 'vue-router';
    import { provide, ref } from 'vue';

    const userStore = useUserStore()
    const route = useRoute()

    // todo: 获取顶部导航栏左侧传来的闭合布尔值
    const isFold = ref(false)
    provide('getIsFold', (fold) => {
        isFold.value = fold
    })



</script>

<template>
    <div class='layout_container'>
        <!-- 左侧菜单 -->
        <div class="layout_slider" :class="{ fold: isFold }">
            <Logo></Logo>
            <!-- 导航菜单 -->
            <el-scrollbar class="scrollbar">
                <el-menu background-color="#001529" text-color="white" :default-active="route.path" :collapse="isFold"
                    :collapse-transition='false'>
                    <Menu :menuList="userStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>

        <!-- 顶部导航 -->
        <div class="layout_tabbar" :class="{ fold: isFold }">
            <Tabbar></Tabbar>
        </div>

        <!-- 主体内容 -->
        <div class="layout_main" :class="{ fold: isFold }">
            <!-- todo: 二级路由出口 -->
            <Main></Main>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .layout_container {
        // background-color: pink;
        width: 100%;
        height: 100vh;

        // 左侧菜单
        .layout_slider {
            width: $base-menu-width;
            height: 100vh;
            background-color: $base-menu-background;
            // 菜单折叠展开动画
            transition: all .3s;

            // 无限滚动盒子
            .scrollbar {
                width: 100%;
                height: calc(100vh - $base-menu-logo-hegiht);

                // 去除菜单组件右边边框
                .el-menu {
                    border: none
                }
            }

            // 拥有fold类名时的样式
            &.fold {
                width: $base-menu-min;
            }
        }

        // 顶部导航栏
        .layout_tabbar {
            position: fixed;
            width: calc(100% - $base-menu-width);
            // background-color: salmon;
            height: $base-tabbar-height;
            top: 0;
            left: $base-menu-width;
            // 菜单折叠展开动画
            transition: all .3s;

            // 拥有fold类名时的样式
            &.fold {
                width: calc(100vw - $base-menu-min);
                left: $base-menu-min;
            }
        }

        // 二级路由展示区
        .layout_main {
            position: absolute;
            left: $base-menu-width;
            top: $base-tabbar-height;
            height: calc(100vh - $base-tabbar-height);
            width: calc(100% - $base-menu-width);
            padding: 20px;
            // 滚动查看过长的子元素
            overflow: auto;
            background-color: skyblue;
            transition: all .3s;

            // 拥有fold类名时的样式
            &.fold {
                width: calc(100vw - $base-menu-min);
                left: $base-menu-min;
            }
        }
    }
</style>