<script lang='ts' setup name="Main">

</script>

<template>
    <div class=''>
        <!-- 使用插槽注入路由组件 -->
        <router-view v-slot="{ Component }">
            <transition name="fade">
                <component :is="Component"></component>
            </transition>
        </router-view>
    </div>
</template>

<style scoped>
    .fade-enter-from {
        opacity: 0;
    }

    .fade-enter-active {
        transition: all .3s;
    }

    .fade-enter-to {
        opacity: 1;
    }
</style>