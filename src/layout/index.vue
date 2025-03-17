<script lang='ts' setup>
    import Logo from './Logo/index.vue'
</script>

<template>
    <div class='layout_container'>
        <!-- 左侧菜单 -->
        <div class="layout_slider">
            <Logo></Logo>
            <!-- 导航菜单 -->
            <el-scrollbar class="scrollbar">
                <el-menu background-color="$base-menu-background" text-color="white">
                    <el-menu-item index="1">首页</el-menu-item>
                    <el-menu-item index="2">数据大屏</el-menu-item>
                    <!-- 多级菜单 -->
                    <el-sub-menu index="3">
                        <template #title>
                            <span>权限管理</span>
                        </template>
                        <el-menu-item index="3-1">用户管理</el-menu-item>
                        <el-menu-item index="3-2">角色管理</el-menu-item>
                        <el-menu-item index="3-3">菜单管理</el-menu-item>
                    </el-sub-menu>
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