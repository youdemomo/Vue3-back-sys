<script lang='ts' setup>
  import { Plus } from '@element-plus/icons-vue';

  // 测试mock接口
  import axios from 'axios'
  import { onMounted } from 'vue';


  // 登录接口测试
  const loginTest = async () => {
    const res = await axios({
      url: '/api/user/login',
      method: "post",
      data: {
        username: 'admin',
        password: '111111',
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