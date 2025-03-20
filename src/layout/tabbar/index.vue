<script lang='ts' setup>
    import BreadLeft from './bread-left/index.vue'
    import SettingRight from './setting-right/index.vue'
</script>

<template>
    <!-- 导航栏内各个组件边距用行内样式确定 -->
    <div class='tabbar'>
        <!-- 左侧 -->
        <div class="tabbar_left">
            <BreadLeft></BreadLeft>
        </div>

        <!-- 右侧 -->
        <div class="tabbar_right">
            <SettingRight></SettingRight>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .tabbar {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(to right, #f3ebeb, #e9e4f0, #f3ebeb);
        // background-color: aqua;

        // 左侧盒子
        .tabbar_left {
            display: flex;
            align-items: center;
        }

        // 右侧盒子 
        .tabbar_right {
            display: flex;
            align-items: center;
        }
    }
</style>