
const routes = [
  {
    path: '/',
    component: () => import('layouts/Auth/AuthLayout.vue'),
    children: [
      {
        name: 'Login',
        path: '/',
        component: () => import('pages/Auth/Login.vue'),
        meta: { title: 'Login' }
      },
      {
        name: 'ForgetPassword',
        path: '/lost-password',
        component: () => import('pages/Auth/ForgetPassword.vue'),
        meta: { title: 'Lost Password' }
      },
      {
        name: 'RecoverPassword',
        path: '/lost-password/recover/:access',
        component: () => import('pages/Auth/RecoverPassword.vue'),
        meta: { title: 'Recover Password' }
      },
      {
        name: 'Register',
        path: '/register',
        component: () => import('pages/Auth/Register.vue'),
        meta: { title: 'Register' }
      },
      {
        name: 'RegisterVerify',
        path: '/register/verify/:access',
        component: () => import('pages/Auth/RegisterVerify.vue'),
        meta: { title: 'Verifiying Email' }
      }
    ]
  },
  {
    path: '/home',
    component: () => import('layouts/Page/PageLayout.vue'),
    children: [
      {
        name: 'Home',
        path: '/',
        component: () => import('pages/Page/Home.vue'),
        meta: { title: 'Home' }
      },
      {
        name: 'Profile',
        path: '/user/profile',
        component: () => import('pages/Page/User/Profile.vue'),
        meta: { title: 'Profile' }
      },
      {
        name: 'HistoryLogin',
        path: '/user/history/login/:log_code',
        component: () => import('pages/Page/User/HistoryLogin.vue'),
        meta: { title: 'Login History' }
      }
    ]
  },
  {
    name: 'About',
    path: '/about',
    // component: AboutPage,
    meta: { title: 'About Us' }
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
