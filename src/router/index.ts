import { createRouter, createWebHistory } from 'vue-router'
import { constantRoute } from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoute,
  scrollBehavior() {
    return {
      top: 0,
    }
  },
})

export default router
