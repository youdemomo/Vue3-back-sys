<script lang='ts' setup name="Main">
    import { nextTick, onMounted, ref, watch } from 'vue';
    import { emitter } from '../../utils/emitter';

    // 通知刷新
    const isRefsh = ref(false)
    // 控制路由出口刷新
    const refshFlag = ref(true)
    // todo: 绑定事件，书写回调，接受刷新通知
    onMounted(() => emitter.on('send-refsh', (value) => {
        isRefsh.value = value
    }))

    watch(() => isRefsh.value, () => {
        // isRefsh变化后，refshFlag控制v-if刷新页面
        refshFlag.value = false
        // DOM更新后，即路由出口隐藏后，再渲染页面，实现刷新
        nextTick(() => {
            refshFlag.value = true
        })
    })
</script>

<template>
    <div class=''>
        <!-- 使用插槽注入路由组件 -->
        <router-view v-slot="{ Component }">
            <transition name="fade">
                <component :is="Component" v-if="refshFlag"></component>
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