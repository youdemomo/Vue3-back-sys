import type { RouteRecordRaw } from 'vue-router'
// 定义user仓库的类型
export interface UserState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
}
