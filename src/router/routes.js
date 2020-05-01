
const routes = [
  {
    path: '/',
    component: () => import('layouts/Auth/AuthLayout.vue'),
    children: [
      {
        name: 'Login',
        path: '/',
        component: () => import('pages/Auth/Login.vue'),
        meta: { title: 'Login Page' }
      },
      {
        name: 'ForgetPassword',
        path: '/lost-password',
        // component: ForgetPasswordPage,
        meta: { title: 'Lost Password' }
      },
      {
        name: 'RecoverPassword',
        path: '/lost-password/recover/:access',
        // component: RecoverPasswordPage,
        meta: { title: 'Recover Password' }
      },
      {
        name: 'Register',
        path: '/register',
        // component: RegisterPage,
        meta: { title: 'Register Page' }
      },
      {
        name: 'RegisterVerify',
        path: '/register/verify/:access',
        // component: RegisterVerifyPage,
        meta: { title: 'Verifiying Email' }
      }
    ]
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
