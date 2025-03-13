import { createApp } from 'vue'
import App from './App.vue'
// 引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// svg相关
import 'virtual:svg-icons-register'

const app = createApp(App)

app.use(ElementPlus)

app.mount('#app')
