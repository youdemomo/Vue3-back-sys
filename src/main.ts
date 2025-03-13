import { createApp } from 'vue'
import App from './App.vue'
// 引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// svg相关
import 'virtual:svg-icons-register'

const app = createApp(App)

app.use(ElementPlus)

// 引入自定义插件，用于注册全局组件
import globalComponent from '@/components/index.ts'
app.use(globalComponent)

app.mount('#app')
