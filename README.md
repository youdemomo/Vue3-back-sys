# 1. 全局组件注册插件

​	通过 `Object.keys()` 获取 `allGlobalComponent` 的所有 key（组件名）。

​	依次调用 `app.component(key, allGlobalComponent[key])` 进行注册。

​	然后在main.ts中引入并使用这个插件即可。

```ts
import SvgIcon from '@/components/SvgIcon/index.vue'
// 所有element-ui图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 存储所有要注册的组件
const allGlobalComponent = {
  SvgIcon,
}

export default {
  install(app: any) {
    // Obj.keys方法解析出包含所有组件名的数组
    // 遍历数组注册全局组件
    Object.keys(allGlobalComponent).forEach(key => {
      app.component(key, allGlobalComponent[key])
    })

    // 注册所有图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}

```



# 2. 递归组件

组件在模板中使用自己，用于渲染嵌套路由

```html
    <!-- 有多个子路由 -->
    <el-sub-menu v-if="item.children && item.children.length > 1 && item.meta.isShow" :index="item.path">
        <!-- 顶级菜单标题 -->
        <template #title>
            <el-icon>
                <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{ item.meta.title }}</span>
        </template>
        <!-- 递归传入chilren数组，保证能渲染出多级路由的children -->
        <Menu :menuList="item.children"></Menu>
    </el-sub-menu>
```

​	嵌套组件需要具名，安装插件可在setup语法糖中为组件命名

`npm i vite-plugin-vue-setup-extend -D`

​	在vite.config.ts中：

```ts
import { defineConfig } from 'vite'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

export default defineConfig({
  plugins: [ VueSetupExtend() ]
})
```



# 3. 路由出口的二次封装

使用路由出口的插槽注入路由目标组件

```html
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
```

```css
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
```



# 4. el-menu组件根据路由展开菜单

```html
 <el-menu background-color="$base-menu-background" text-color="white" :default-active="route.path">
```

:default-active="route.path"用于指定默认激活的菜单item的index值，而每一个item的index就是路由path



# 5. 左侧菜单折叠

​	首先，在折叠按钮组件中记录折叠的布尔值，使用inject接受layout组件提供的获取折叠布尔值的函数，传给layout组件记录折叠的布尔值。（祖孙组件通信，祖传函数，孙通过函数传给祖数据）

​	layout组件：

```ts
const isFold = ref(false)
provide('getIsFold', (fold) => {
    isFold.value = fold
})
```

​	breadLeft组件：

```ts
const provideFold = inject('getIsFold')
const changeIcon = () => {
    fold.value = !fold.value
    provideFold(fold.value)
}
```

​	layout组件获得布尔值后，根据布尔值为顶部导航栏，左侧菜单和二级路由出口动态绑定fold类名，并控制el-menu组件的collapse属性实现菜单折叠：

```html
<!-- 左侧菜单 -->
<div class="layout_slider" :class="{ fold: isFold }">

    <!-- 导航菜单 -->
    <el-scrollbar class="scrollbar">
        <el-menu background-color="#001529" text-color="white" 				:default-active="route.path" :collapse="isFold">
```

```css
// 菜单折叠展开动画
transition: all .3s;

// 拥有fold类名时的样式
&.fold {
    width: $base-menu-min;
}
```

​	前往logo组件，为展示标题的p标签添加如下css，防止菜单折叠时文字抖动：

```css
// 禁止文本换行，防止菜单折叠时文字抖动
white-space: nowrap;
```



# 6. 路由渲染面包屑

​	通过route的matched获取当前路由的所有父路由和当前路由，v-for渲染面包屑item。当路由的meta没有title时不渲染。

```html
<!-- 面包屑 -->
<el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="item in route.matched" :key="item.path" :to="item.path" v-show="item.meta.title">
        <!-- 面包屑图标 -->
        <el-icon style="margin-right: 6px;">
            <component :is="item.meta.icon" style="margin-top: 2px;"></component>
        </el-icon>
        <!-- 面包屑标题 -->
        <span> {{ item.meta.title }}</span>
    </el-breadcrumb-item>
</el-breadcrumb>
```



# 7. 页面刷新功能实现

​	在顶部导航栏的右边组件SettingRight中，通过refsh的变动通知Main组件刷新，将refsh通过mitt传给Main:

​	SettingRight:

```ts
// todo: 刷新按钮回调
const refsh = ref(false)
const refreshMain = () => {
    refsh.value = !refsh.value
    // 触发Main组件绑定的send-refsh事件，通知Main组件刷新
    emitter.emit('send-refsh', refsh.value)
}
```

​	Main:

​	Main组件中，借助isRefsh监视SettingRight传来的刷新标识是否变化，变化则视为刷新，将refshFlag置为false，销毁二级路由出口。

​	再通过nextTick()钩子，在二级路由销毁后（也就是DOM节点更新后）把refshFlag置为true，重新渲染二级路由出口。

```ts
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
```

```html
<router-view v-slot="{ Component }">
    <transition name="fade">
        <component :is="Component" v-if="refshFlag"></component>
    </transition>
</router-view>
```



# 8. 全屏按钮功能实现

```ts
    // todo: 全屏按钮回调
    const fullScreen = () => {
        // 全屏返回true，否则返回null
        let full = document.fullscreenElement

        if (full) {
            // 退出全屏
            document.exitFullscreen()
        } else {
            // 进入全屏
            document.documentElement.requestFullscreen()
        }
    }
```



# 9. axios请求拦截器拼接token

​	第9行的拼接方式是由后端决定的。

​	注意：userStore的声明不能在全局作用域，否则会出现依赖循环引用的问题。

```ts
// todo: 请求拦截器
// 传入的配置对象config，有许多与请求相关的信息
request.interceptors.request.use(config => {
  // 获取用户token
  const userStore = useUserStore()

  // token存在时拼接到请求头
  if (userStore.token) {
    config.headers.token = userStore.token
  }
  return config
})
```

