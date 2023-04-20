import { createRouter, createWebHistory } from 'vue-router'
import { parseJwt } from '../mixins/utils.js'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { layout: 'login' },
  },
  {
    path: '/forgot-password',
    name: 'Forgot password',
    component: () => import('../views/ForgotPassword.vue'),
    meta: { layout: 'login' },
  },
  {
    path: '/reset-password/:link',
    name: 'Reset password',
    component: () => import('../views/ResetPassword.vue'),
    meta: { layout: 'login' },
  },
  {
    path: '/dashboard',
    name: 'Index',
    component: () => import('../views/Home.vue'),
    meta: { layout: 'dashboard' },
    beforeEnter: navigationGuards(['admin', 'doctor', 'cashier', 'super_manager', 'tech_admin']),
  },
  {
    path: '/services',
    name: 'Services',
    component: () => import('../views/Services.vue'),
    meta: { layout: 'dashboard' },
    beforeEnter: navigationGuards(['admin', 'doctor', 'cashier', 'super_manager', 'tech_admin']),
  },
  {
    path: '/trainer-services',
    name: 'Trainer services',
    component: () => import('../views/TrainerServices.vue'),
    meta: { layout: 'dashboard' },
    beforeEnter: navigationGuards(['admin', 'doctor', 'cashier', 'super_manager', 'tech_admin']),
  },
  {
    path: '/tariffs',
    name: 'Customer tariffs',
    component: () => import('../views/CustomerTariffs.vue'),
    meta: { layout: 'dashboard' },
    beforeEnter: navigationGuards(['admin', 'doctor', 'cashier', 'super_manager', 'tech_admin']),
  },
  {
    path: '/trainer-tariffs',
    name: 'Customer trainer tariffs',
    component: () => import('../views/CustomerTrainerTariffs.vue'),
    meta: { layout: 'dashboard' },
    beforeEnter: navigationGuards(['admin', 'doctor', 'cashier', 'super_manager', 'tech_admin']),
  },
  {
    path: '/customers',
    name: 'Customers',
    component: () => import('../views/Customers.vue'),
    meta: { layout: 'dashboard' },
    beforeEnter: navigationGuards(['admin', 'doctor', 'cashier', 'super_manager', 'tech_admin']),
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/Users.vue'),
    meta: { layout: 'dashboard' },
    beforeEnter: navigationGuards(['super_manager', 'tech_admin']),
  },
  {
    path: '/notfound',
    name: 'Not-Found',
    component: () => import('../components/NotFound.vue'),
  },
  {
    path: '/:pathMach(.*)*',
    name: 'NotFound',
    component: () => import('../components/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/', '/forgot-password', '/reset-password']
  const authNotRequired = !publicPages.includes(to.path)
  const notLoggedIn = localStorage.getItem('token')
  if ((authNotRequired && notLoggedIn) || publicPages.includes(`/${to.path.split('/')[1]}`)) {
    next()
  } else {
    next('/')
  }
})

function navigationGuards(access) {
  return () => {
    if (localStorage.getItem('token') && !access.includes(parseJwt()?.role)) {
      router.push('/notfound')
      console.log('Oops!')
    }
    return access.includes(parseJwt()?.role)
  }
}

export default router
