import { createApp } from 'vue'
import App from './App.vue'
// 引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// svg相关
import 'virtual:svg-icons-register'
// 引入自定义插件，用于注册全局组件
import globalComponent from '@/components/index.ts'
// 引入模板的全局样式(用于清除浏览器的默认样式)
import '@/styles/index.scss'
// 路由器
import router from '@/router/index.ts'
// pinia
import pinia from './store'
// 全局路由守卫
import './router/permission'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.use(globalComponent)
app.use(pinia)

app.mount('#app')
