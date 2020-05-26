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
                href="#manage"
                data-toggle="tab"
              >Manage</a>
            </li>
          </ul>
        </div>
        <div class="card-body">
          <div class="tab-content">
            <div
              class="tab-pane active"
              id="manage"
            >
              Manage
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminMenuNewMember',
  components: {
    UserProperty: () => import('pages/Admin/Menu/Component/UserProperty')
  },
  created () {
    this.getResAdminMenuUserDetail()
  },
  methods: {
    getResAdminMenuUserDetail () {
      this.$axios.getCookies().then(() => {
        this.$axios.getResAdminMenuUserDetail(this.userCode).then((res) => {
          const data = res.data.response_data
          if (data.user.length === 0) return this.$router.push({ name: 'AdminMenuUserList' })
          this.userData = data.user || null
        })
      })
    }
  },
  data () {
    return {
      userCode: this.$route.params.code,
      userData: { profile_img: this.$AppHelper.defaultProfileImg() }
    }
  }
}
</script>
