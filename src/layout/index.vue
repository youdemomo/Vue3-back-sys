<script lang='ts' setup>
    // logo组件
    import Logo from './Logo/index.vue'
    // 左侧菜单组件
    import Menu from './Menu/index.vue'
    // 获取路由数组
    import { useUserStore } from '../store/modules/user';

    const userStore = useUserStore()
</script>

<template>
    <div class='layout_container'>
        <!-- 左侧菜单 -->
        <div class="layout_slider">
            <Logo></Logo>
            <!-- 导航菜单 -->
            <el-scrollbar class="scrollbar">
                <el-menu background-color="$base-menu-background" text-color="white">
                    <Menu :menuList="userStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>

        <!-- 顶部导航 -->
        <div class="layout_tabbar">2</div>

        <!-- 主体内容 -->
        <div class="layout_main">3
            <p style="height: 10000px;"></p>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .layout_container {
        background-color: pink;
        width: 100%;
        height: 100vh;

        .layout_slider {
            width: $base-menu-width;
            height: 100vh;
            background-color: $base-menu-background;

            .scrollbar {
                width: 100%;
                height: calc(100vh - $base-menu-logo-hegiht);

                // 去除菜单组件右边边框
                .el-menu {
                    border: none
                }
            }
        }

        .layout_tabbar {
            position: fixed;
            width: calc(100% - $base-menu-width);
            background-color: salmon;
            height: $base-tabbar-height;
            top: 0;
            left: $base-menu-width;
        }

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
        }
    }
</style>