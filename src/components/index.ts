import SvgIcon from '@/components/SvgIcon/index.vue'
// 所有element-ui图标
import Category from '@/components/Category/index.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 存储所有要注册的组件
const allGlobalComponent = {
    SvgIcon,
    Category,
}

export default {
    install(app: any) {
        // Obj.keys方法解析出包含所有组件名的数组
        // 遍历数组注册全局组件
        Object.keys(allGlobalComponent).forEach((key) => {
            app.component(key, allGlobalComponent[key])
        })

        // 注册所有图标
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }
    },
}
