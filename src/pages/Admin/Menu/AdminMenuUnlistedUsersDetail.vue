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
                href="#history"
                data-toggle="tab"
              >History</a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link text-bold"
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
              id="history"
            >
              <UserHistory :userHistory="userHist" />
            </div>
            <div
              class="tab-pane"
              id="member-management"
            >
              <UserRestore :defaultReturn="routeName" />
              <hr>
              <UserDeleteForce :defaultReturn="routeName" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminMenuUnlistedUsersDetail',
  components: {
    UserProperty: () => import('pages/Admin/Menu/Component/UserProperty'),
    UserHistory: () => import('pages/Admin/Menu/Component/UserHistory'),
    UserRestore: () => import('pages/Admin/Menu/Component/UserRestore'),
    UserDeleteForce: () => import('pages/Admin/Menu/Component/UserDeleteForce')
  },
  created () {
    this.getResAdminMenuUserDetail()
  },
  methods: {
    getResAdminMenuUserDetail () {
      this.$axios.getCookies().then(() => {
        this.$axios.getResAdminMenuUserDetail(this.userCode).then((res) => {
          const data = res.data.response_data
          if (data.user.length === 0) return this.$router.push({ name: this.routeName })
          this.userData = data.user || null
          this.userHist = data.history.reverse() || null
        })
      })
    }
  },
  data () {
    return {
      routeName: 'AdminMenuUnlistedUsersList',
      userCode: this.$route.params.code,
      userData: { profile_img: this.$AppHelper.defaultProfileImg() },
      userHist: null
    }
  }
}
</script>
