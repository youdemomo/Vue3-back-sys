<script lang='ts' setup name="Logo">
    // 引入标题logo配置
    import setting from '../../setting';

</script>

<template>
    <div class='logo'>
        <img :src=setting.logo alt="" v-if="setting.isShowLogo">
        <p>{{ setting.title }}</p>
    </div>
</template>

<style scoped lang="scss">
    .logo {
        display: flex;
        width: 100%;
        height: $base-menu-logo-hegiht;
        color: white;
        align-items: center;
        padding: 8px;

        img {
            width: 42px;
            height: 42px;
        }

        p {
            font-size: $base-logo-title-fontSize;
            margin-left: 10px;
        }
    }
</style>