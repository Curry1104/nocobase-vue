import Vue from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '../layouts/AuthLayout.vue'
import AdminLayout from '../layouts/AdminLayout.vue'
const routes = [
  {
    path: '/',
    redirect: '/user',
  },
  {
    path: '/user',
    component: AuthLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('../pages/user/Login.vue')
      }
    ]
  },
  {
    path: '/admin/:name(.+)?',
    component: AdminLayout,
  },

  {
    path: '/:pathMatch(.*)*',
    component: () => import('../pages/404/404.vue')
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})