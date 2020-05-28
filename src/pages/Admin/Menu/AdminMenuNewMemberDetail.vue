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
                href="#member-management"
                data-toggle="tab"
              >Member Management</a>
            </li>
          </ul>
        </div>
        <div class="card-body">
          <div class="tab-content">
            <div
              class="tab-pane active"
              id="member-management"
            >
              <UserRegisterConfirm
                :defaultReturn="routeName"
                :registerAccess="userData.access"
              />
              <hr>
              <UserDelete :defaultReturn="routeName" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminMenuNewMemberDetail',
  components: {
    UserProperty: () => import('pages/Admin/Menu/Component/UserProperty'),
    UserRegisterConfirm: () => import('pages/Admin/Menu/Component/UserRegisterConfirm'),
    UserDelete: () => import('pages/Admin/Menu/Component/UserDelete')
  },
  created () {
    this.getResAdminMenuNewMemberDetail()
  },
  methods: {
    getResAdminMenuNewMemberDetail () {
      this.$axios.getCookies().then(() => {
        this.$axios.getResAdminMenuNewMemberDetail(this.userCode).then((res) => {
          const data = res.data.response_data
          if (data.user.length === 0) return this.$router.push({ name: this.routeName })
          this.userData = data.user || null
        })
      })
    }
  },
  data () {
    return {
      routeName: 'AdminMenuNewMemberList',
      userCode: this.$route.params.code,
      userData: { profile_img: this.$AppHelper.defaultProfileImg() }
    }
  }
}
</script>
