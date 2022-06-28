import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '@/views/Index/Login/Login.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: Login
  }
  // {
  //   path: '/Login',
  //   name: 'Login',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Login/Login.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
