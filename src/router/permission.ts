// 路由守卫
import router from '@/router'
import { ElMessage } from 'element-plus'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import setting from '../setting'

// 去除进度条的圆圈
nprogress.configure({ showSpinner: false })

// todo: 全局前置守卫
router.beforeEach((to: any, from: any, next: any) => {
  // 获取用户token
  // read: 这里不要去pinia拿token，有bug!!!
  const token = JSON.parse(localStorage.getItem('User'))?.token || ''
  // 进度条开始显示
  nprogress.start()

  if (token) {
    if (to.path === '/login') {
      // 登录后不能再访问登录页，跳转到主页
      ElMessage({
        type: 'warning',
        message: '请先退出登录(T_T)',
      })
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (to.path === '/login') {
      // 访问登录页面则放行
      next()
    } else {
      // 否则跳转到登录页，传给登录页期望路由
      ElMessage({
        type: 'error',
        message: '请先登录╰（‵□′）╯',
      })
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})

// todo: 全局后置守卫
router.afterEach((to: any, from: any) => {
  // 进度条结束
  nprogress.done()

  // 将页签标题改为路由名字
  document.title = setting.title + '-' + to.meta.title
})
