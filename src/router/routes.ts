import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs'

// 对外暴露配置路由(常量路由)
export const constantRoute = [
  // 登录页
  {
    path: '/login',
    name: 'login',
    // 路由懒加载
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
      // 是否显示在左侧菜单
      isShow: false,
    },
  },
  // 主页
  {
    path: '/',
    name: 'layout',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: 'layout',
      isShow: true,
      // 图标
      icon: 'UserFilled',
    },
    children: [
      {
        path: '/home',
        component: import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          isShow: true,
          icon: 'HomeFilled',
        },
      },
    ],
  },
  // 错误页面
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '404',
      isShow: false,
    },
  },
  // 一级默认路由
  {
    // 匹配所有路径
    path: '/:pathMatch(.*)*',
    name: 'any',
    redirect: '/404',
    meta: {
      title: '任意路由',
      isShow: false,
    },
  },
]
