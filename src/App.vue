<script lang='ts' setup>
  import { Plus } from '@element-plus/icons-vue';

  // 测试二次封装的axios
  import request from './utils/request';
  import { onMounted } from 'vue';


  // 登录接口测试
  const loginTest = async () => {
    const res = await request({
      url: '/user/login',
      method: 'POST',
      data: {
        username: 'admin',
        password: '111111'
      }
    })

    console.log(res);
  }

  onMounted(() => loginTest())
</script>

<template>
  <div>
    <h1>你好</h1>
    <h2>我测你</h2>
  </div>

</template>

<style scoped lang="scss">
  div {
    h1 {
      color: $color;
    }

    h2 {
      color: $a;
    }
  }
</style>