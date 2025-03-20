<script lang='ts' setup>
    import { onMounted } from 'vue';
    import { useUserStore } from '../../store/modules/user';

    const userStore = useUserStore()
    onMounted(() => userStore.getUserInfo())
</script>

<template>
    <div class=''>一级路由 -- 主页</div>
</template>

<style scoped></style>