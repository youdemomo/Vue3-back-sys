// 对外暴露插件对象
import SvgIcon from '@/components/SvgIcon/index.vue'

// 存储所有要注册的组件
const allGlobalComponent = {
  SvgIcon,
}

export default {
  install(app) {
    // Obj.keys方法解析出包含所有组件名的数组
    // 遍历数组注册全局组件
    Object.keys(allGlobalComponent).forEach(key => {
      app.component(key, allGlobalComponent[key])
    })
  },
}
