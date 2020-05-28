
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
      },
      {
        path: '/menu-admin',
        component: () => import('layouts/Page/Admin/MenuLayout.vue'),
        children: [
          {
            name: 'AdminMenu',
            path: '/',
            component: () => import('pages/Admin/Menu/AdminMenu.vue'),
            meta: { title: 'Menu Admin' }
          },
          {
            name: 'AdminMenuUserList',
            path: '/menu-admin/users',
            component: () => import('pages/Admin/Menu/AdminMenuUserList.vue'),
            meta: { title: 'Users' }
          },
          {
            name: 'AdminMenuUnlistedUsersList',
            path: '/menu-admin/unlisted-users',
            component: () => import('pages/Admin/Menu/AdminMenuUnlistedUsersList.vue'),
            meta: { title: 'Unlisted Users' }
          },
          {
            name: 'AdminMenuNewMemberList',
            path: '/menu-admin/new-members',
            component: () => import('pages/Admin/Menu/AdminMenuNewMemberList.vue'),
            meta: { title: 'New Members' }
          },
          {
            name: 'AdminMenuLostPasswordList',
            path: '/menu-admin/lost-password',
            component: () => import('pages/Admin/Menu/AdminMenuLostPasswordList.vue'),
            meta: { title: 'Lost Password' }
          },
          {
            name: 'AdminMenuUserDetail',
            path: '/menu-admin/user/:code/detail',
            component: () => import('pages/Admin/Menu/AdminMenuUserDetail.vue'),
            meta: { title: 'User Detail' }
          },
          {
            name: 'AdminMenuUnlistedUsersDetail',
            path: '/menu-admin/unlisted-user/:code/detail',
            component: () => import('pages/Admin/Menu/AdminMenuUnlistedUsersDetail.vue'),
            meta: { title: 'Unlisted User Detail' }
          },
          {
            name: 'AdminMenuNewMemberDetail',
            path: '/menu-admin/new-member/:code/detail',
            component: () => import('pages/Admin/Menu/AdminMenuNewMemberDetail.vue'),
            meta: { title: 'New Member Detail' }
          },
          {
            name: 'AdminMenuLostPasswordDetail',
            path: '/menu-admin/lost-password/:code/detail',
            component: () => import('pages/Admin/Menu/AdminMenuLostPasswordDetail.vue'),
            meta: { title: 'Lost Password Detail' }
          },
          {
            name: 'AdminMenuUserHistoryDetail',
            path: '/menu-admin/user/:code/history/:log_code/detail',
            component: () => import('pages/Page/User/HistoryLogin.vue'),
            meta: { title: 'User History Detail' }
          }
        ]
      }
    ]
  },
  {
    name: 'About',
    path: '/about',
    component: () => import('pages/About.vue'),
    meta: { title: 'About' }
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    name: 'PageNotFound',
    path: '*',
    component: () => import('pages/Error404.vue'),
    meta: { title: 'Page Not Found' }
  })
}

export default routes
