// 对外暴露配置路由(常量路由)
export const constantRoute = [
  // 登录页
  {
    path: '/login',
    name: 'login',
    // 路由懒加载
    component: () => import('@/views/login/index.vue'),
  },
  // 主页
  {
    path: '/',
    name: 'layout',
    component: () => import('@/layout/index.vue'),
  },
  // 错误页面
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
  },
  // 一级默认路由
  {
    // 匹配所有路径
    path: '/:pathMatch(.*)*',
    name: 'any',
    redirect: '/404',
  },
]
