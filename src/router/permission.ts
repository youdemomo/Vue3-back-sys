// 路由守卫
import router from '@/router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// todo: 全局前置守卫
router.beforeEach((to: any, from: any, next: any) => {
  console.log('前置守卫')
  // to: 将要访问的路由
  // from: 从哪个路由来
  // next: 路由的放行函数

  // 进度条开始显示
  nprogress.start()
  next()
})

// todo: 全局后置守卫
router.afterEach((to: any, from: any) => {
  console.log('后置守卫')

  // 进度条结束
  nprogress.done()
})
