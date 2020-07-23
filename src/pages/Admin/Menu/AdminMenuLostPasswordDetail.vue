<template>
  <div class="row">
    <div class="col-md-4">
      <UserProperty :userProps="userData" />
    </div>
    <div class="col-md-8">
      <div class="card">
        <div class="card-header p-2">
          <ul class="nav nav-pills">
            <li class="nav-item">
              <a
                class="nav-link text-bold active"
                href="#request-management"
                data-toggle="tab"
              >Request Management</a>
            </li>
          </ul>
        </div>
        <div class="card-body">
          <div class="tab-content">
            <div
              class="tab-pane active"
              id="request-management"
            >
              <UserLostPasswordReqMng
                :requestAccess="userRequest"
                :defaultReturn="routeName"
              />
              <hr />
              <MailPreview
                openMail="lostpassword"
                :accessCode="userRequest.access"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminMenuLostPasswordDetail',
  components: {
    UserProperty: () => import('pages/Admin/Menu/Component/UserProperty'),
    UserLostPasswordReqMng: () => import('pages/Admin/Menu/Component/UserLostPasswordReqMng'),
    MailPreview: () => import('src/pages/Admin/Menu/Component/MailPreview')
  },
  created () {
    this.getResAdminMenuLostPasswordDetail()
  },
  methods: {
    getResAdminMenuLostPasswordDetail () {
      this.$axios.getCookies().then(() => {
        this.$axios.getResAdminMenuLostPasswordDetail(this.userCode).then((res) => {
          const data = res.data.response_data
          if (data.user.length === 0) return this.$router.push({ name: this.routeName })
          this.userData = data.user || null
          this.userRequest = { access: data.user.access, request_at: data.user.request_at } || null
        })
      })
    }
  },
  data () {
    return {
      routeName: 'AdminMenuLostPasswordList',
      userCode: this.$route.params.code,
      userData: { profile_img: this.$AppHelper.defaultProfileImg() },
      userRequest: {}
    }
  }
}
</script>
