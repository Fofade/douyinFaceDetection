import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LoginOnline from "@/views/Index/Login/LoginOnline.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Index",
    component: LoginOnline,
  },
  // {
  //   path: '/Login',
  //   name: 'Login',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Login/Login.vue')
  // }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
