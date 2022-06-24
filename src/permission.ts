import router from './router'
import { notification } from "ant-design-vue";


// const formatRoutes = routes => {
//   if (!routes) return
//   return routes.map(route => {
//     if (route.type === "redirect") {
//       return {
//         path: route.from,
//         redirect: route.to,
//         meta: route.uiSchemaUid
//       }
//     }
//     return {
//       path: route.path,
//       component: route.component,
//       meta: route.uiSchemaUid,
//       children: formatRoutes(route.routes)
//     }
//   })
// }
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('NOCOBASE_TOKEN')
  if (token) {
    next()
  } else {
    if (to.path === '/user/login') {
      next()
    } else {
      next({ path: '/user/login' })
      notification.error({ message: '请登录！' })
    }
  }
})