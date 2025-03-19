import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs'

// 对外暴露配置路由(常量路由)
export const constantRoute = [
  // todo: 登录页
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
  // todo: 首页
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
    redirect: '/home',
    // bro: 1.主页
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          isShow: true,
          icon: 'HomeFilled',
        },
      },
    ],
  },
  // todo: 数据大屏
  {
    path: '/screen',
    name: 'Screen',
    component: () => import('@/views/screen/index.vue'),
    meta: {
      title: '数据大屏',
      isShow: true,
      icon: 'Platform',
    },
  },
  // todo: 权限管理
  {
    path: '/acl',
    name: 'Acl',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '权限管理',
      isShow: true,
      icon: 'Lock',
    },
    children: [
      // bro: 1.用户管理
      {
        // 由于菜单组件的index使用path，子路由的路径必须写全
        path: '/acl/user',
        name: 'User',
        component: () => import('@/views/acl/user/index.vue'),
        meta: {
          title: '用户管理',
          isShow: true,
          icon: 'User',
        },
      },
      // bro: 2.角色管理
      {
        path: '/acl/role',
        name: 'Role',
        component: () => import('@/views/acl/role/index.vue'),
        meta: {
          title: '角色管理',
          isShow: true,
          icon: 'Avatar',
        },
      },
      // bro: 3.权限管理
      {
        path: '/acl/permission',
        name: 'Permission',
        component: () => import('@/views/acl/permission/index.vue'),
        meta: {
          title: '权限管理',
          isShow: true,
          icon: 'WindPower',
        },
      },
    ],
  },
  // todo: 商品管理
  {
    path: '/product',
    name: 'Product',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '商品管理',
      icon: 'Goods',
      isShow: true,
    },
    children: [
      // bro: 1. 品牌管理
      {
        path: '/product/trademark',
        name: 'Tradmark',
        component: () => import('@/views/product/trademark/index.vue'),
        meta: {
          title: '品牌管理',
          icon: 'ShoppingCartFull',
          isShow: true,
        },
      },
      // bro: 2. 属性管理
      {
        path: '/product/attr',
        name: 'Attr',
        component: () => import('@/views/product/attr/index.vue'),
        meta: {
          title: '属性管理',
          icon: 'Goods',
          isShow: true,
        },
      },
      // bro: 3. spu管理
      {
        path: '/product/spu',
        name: 'Spu',
        component: () => import('@/views/product/spu/index.vue'),
        meta: {
          title: 'SPU管理',
          icon: 'Van',
          isShow: true,
        },
      },
      // bro: 4. sku管理
      {
        path: '/product/sku',
        name: 'Sku',
        component: () => import('@/views/product/sku/index.vue'),
        meta: {
          title: 'SKU管理',
          icon: 'Bicycle',
          isShow: true,
        },
      },
    ],
  },
  // todo: 错误页面
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '404',
      isShow: false,
    },
  },
  // todo: 一级默认路由
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
