<script lang='ts' setup>
    defineProps({
        // 图标名前缀
        prefix: {
            type: String,
            default: '#icon-'
        },
        // 图标名
        name: {
            type: String,
            default: 'cap',
        },
        // 图标颜色
        color: {
            type: String,
            default: '',
        },
        // 图标宽度
        width: {
            type: String,
            default: '16px'
        },
        // 图标高度
        height: {
            type: String,
            default: '16px'
        }
    })
</script>

<template>
    <div class=''>
        <!-- svg:图标外层容器节点 内部需要与use标签结合使用 -->
        <svg :style="{ width, height }">
            <!-- 指定图标名字，需以icon开头 -->
            <use :xlink:href="prefix + name" fill=""></use>
        </svg>
    </div>
</template>

<style scoped></style>