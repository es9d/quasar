<template>
  <div class="row">
    <div class="col-md-4">
      <div class="card card-primary card-outline">
        <div class="card-body box-profile">
          <div class="text-center">
            <img
              class="profile-user-img img-fluid img-circle"
              :src="`${this.$AppHelper.apiEndpoint()}${userData.profile_img}`"
              alt="user-profile-image"
            />
          </div>
          <h3 class="profile-username text-center">{{ userData.name }}</h3>
          <p class="text-muted text-bold text-center">{{ userData.status }}</p>
          <ul class="list-group list-group-unbordered mb-3">
            <li class="list-group-item">
              <i class="fas fa-at"></i>
              <a class="float-right">{{ userData.email }}</a>
            </li>
            <li
              class="list-group-item"
              v-html="userActiveConvert(userData.active)"
            />
            <li class="list-group-item">
              <i class="fas fa-user-plus"></i>
              <a class="float-right">{{ userData.registered }}</a>
            </li>
          </ul>
        </div>
      </div>
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
              id="history"
            >
              <UserHistory :userHistory="userHist" />
            </div>
            <div
              class="tab-pane"
              id="manage"
            >
              <UserManage :userActiveStatusNow="userData.active" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminMenuUserDetail',
  components: {
    UserHistory: () => import('pages/Admin/Menu/Component/UserHistory'),
    UserManage: () => import('pages/Admin/Menu/Component/UserManage')
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
          this.userHist = data.history.reverse() || null
        })
      })
    },
    userActiveConvert (status) {
      if (status === 'Suspend') {
        return `<font class="text-bold text-warning"><i class="fas fa-exclamation-circle"></i><a class="float-right">${status}</a></font>`
      } else if (status === 'Block') {
        return `<font class="text-bold text-danger"><i class="far fa-times-circle"></i><a class="float-right">${status}</a></font>`
      } else {
        return `<font class="text-bold text-success"><i class="far fa-check-circle"></i><a class="float-right">${status}</a></font>`
      }
    }
  },
  data () {
    return {
      userCode: this.$route.params.code,
      userData: { profile_img: this.$AppHelper.defaultProfileImg() },
      userHist: null
    }
  }
}
</script>
