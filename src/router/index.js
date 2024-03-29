import { createRouter, createWebHistory } from 'vue-router'
import { parseJwt } from '../mixins/utils.js'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/Index.vue'),
    meta: { layout: 'login' },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { layout: 'login' },
  },
  {
    path: '/sign-up',
    name: 'Sign up',
    component: () => import('../views/SignUp.vue'),
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
    name: 'Dashboard',
    component: () => import('../views/Home.vue'),
    meta: { layout: 'dashboard' },
    beforeEnter: navigationGuards(['admin', 'super_manager', 'tech_admin', 'trainer']),
  },
  {
    path: '/services',
    name: 'Services',
    component: () => import('../views/Services.vue'),
    meta: { layout: 'dashboard' },
    beforeEnter: navigationGuards(['admin', 'super_manager', 'tech_admin']),
  },
  {
    path: '/trainer-services',
    name: 'Trainer services',
    component: () => import('../views/TrainerServices.vue'),
    meta: { layout: 'dashboard' },
    beforeEnter: navigationGuards(['admin', 'super_manager', 'tech_admin']),
  },
  {
    path: '/tariffs',
    name: 'Customer tariffs',
    component: () => import('../views/CustomerTariffs.vue'),
    meta: { layout: 'dashboard' },
    beforeEnter: navigationGuards(['admin', 'super_manager', 'tech_admin']),
  },
  {
    path: '/trainer-tariffs',
    name: 'Customer trainer tariffs',
    component: () => import('../views/CustomerTrainerTariffs.vue'),
    meta: { layout: 'dashboard' },
    beforeEnter: navigationGuards(['admin', 'super_manager', 'tech_admin']),
  },
  {
    path: '/customers',
    name: 'Customers',
    component: () => import('../views/Customers.vue'),
    meta: { layout: 'dashboard' },
    beforeEnter: navigationGuards(['admin', 'super_manager', 'tech_admin']),
  },
  {
    path: '/customer',
    name: 'Customer',
    component: () => import('../views/Customer.vue'),
    meta: { layout: 'dashboard' },
    beforeEnter: navigationGuards(['admin', 'super_manager', 'tech_admin']),
  },
  {
    path: '/payments',
    name: 'Payments',
    component: () => import('../views/Payments.vue'),
    meta: { layout: 'dashboard' },
    beforeEnter: navigationGuards(['admin', 'super_manager', 'tech_admin']),
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/Users.vue'),
    meta: { layout: 'dashboard' },
    beforeEnter: navigationGuards(['super_manager', 'tech_admin']),
  },
  {
    path: '/visits',
    name: 'Visits',
    meta: { layout: 'dashboard' },
    children: [
      {
        path: '',
        name: 'Daily visits',
        component: () => import('../components/VisitsTabs/DailyVisits.vue'),
      },
      {
        path: 'report',
        name: 'Visits report',
        component: () => import('../components/VisitsTabs/Visits.vue'),
      },
    ],
    beforeEnter: navigationGuards(['super_manager', 'tech_admin', 'admin']),
  },
  {
    path: '/sms-messages',
    name: 'SMS messages',
    component: () => import('../views/SmsMessages.vue'),
    meta: { layout: 'dashboard' },
    beforeEnter: navigationGuards(['super_manager']),
  },
  {
    path: '/sales',
    name: 'Sales',
    meta: { layout: 'dashboard' },
    children: [
      {
        path: '',
        name: 'Daily sales',
        component: () => import('../components/SalesTabs/DailySales.vue'),
      },
      {
        path: 'report',
        name: 'Sales report',
        component: () => import('../components/SalesTabs/SalesReport.vue'),
      },
    ],
    beforeEnter: navigationGuards(['cashier', 'super_manager', 'tech_admin']),
  },
  {
    path: '/products',
    name: 'Products',
    component: ()=> import('../views/Products.vue'),
    meta: { layout: 'dashboard' },
    beforeEnter: navigationGuards(['admin', 'super_manager', 'tech_admin']),
  },
  {
    path: '/history-products',
    name: 'History Products',
    component: ()=> import('../views/HistoryProducts.vue'),
    meta: { layout: 'dashboard' },
    beforeEnter: navigationGuards(['admin', 'super_manager', 'tech_admin']),
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
  const publicPages = ['/', '/login', '/sign-up', '/forgot-password', '/reset-password']
  const authNotRequired = !publicPages.includes(to.path)
  const notLoggedIn = localStorage.getItem('session')
  if ((authNotRequired && notLoggedIn) || publicPages.includes(`/${to.path.split('/')[1]}`)) {
    next()
  } else {
    next('/')
  }
})

function navigationGuards(access) {
  return () => {
    if (localStorage.getItem('session') && !access.includes(parseJwt()?.role)) {
      router.push('/notfound')
    }
    return access.includes(parseJwt()?.role)
  }
}

export default router
