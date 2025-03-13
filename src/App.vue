<script lang='ts' setup>
  import { Plus } from '@element-plus/icons-vue';
  import Svgicon from './components/SvgIcon/index.vue'
</script>

<template>
  <div class=''>app</div>
  <el-button :icon="Plus" circle />
  <Svgicon :name="cap" width="20px" height="20px"></Svgicon>

</template>

<style scoped></style>