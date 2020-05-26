<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 col-sm-6 col-lg-3">
        <div class="small-box bg-info">
          <div class="inner">
            <h3>{{countOfUsers}}</h3>
            <p>Users</p>
          </div>
          <div class="icon">
            <i class="fas fa-users"></i>
          </div>
          <router-link
            :to="{name:'AdminMenuUserList'}"
            class="small-box-footer"
          >More info <i class="fas fa-arrow-circle-right"></i></router-link>
        </div>
      </div>
      <div class="col-12 col-sm-6 col-lg-3">
        <div class="small-box bg-info">
          <div class="inner">
            <h3>{{countOfUnlistedUsers}}</h3>
            <p>Unlisted Users</p>
          </div>
          <div class="icon">
            <i class="fas fa-user-minus"></i>
          </div>
          <router-link
            :to="{name:'AdminMenuUnlistedUsersList'}"
            class="small-box-footer"
          >More info <i class="fas fa-arrow-circle-right"></i></router-link>
        </div>
      </div>
      <div class="col-12 col-sm-6 col-lg-3">
        <div class="small-box bg-info">
          <div class="inner">
            <h3>{{countOfNewMembers}}</h3>
            <p>New Members</p>
          </div>
          <div class="icon">
            <i class="fas fa-user-plus"></i>
          </div>
          <router-link
            :to="{name:'AdminMenuNewMemberList'}"
            class="small-box-footer"
          >More info <i class="fas fa-arrow-circle-right"></i></router-link>
        </div>
      </div>
      <div class="col-12 col-sm-6 col-lg-3">
        <div class="small-box bg-info">
          <div class="inner">
            <h3>{{countOfLostPassword}}</h3>
            <p>Lost Password</p>
          </div>
          <div class="icon">
            <i class="fas fa-user-lock"></i>
          </div>
          <router-link
            :to="{name:'AdminMenuLostPasswordList'}"
            class="small-box-footer"
          >More info <i class="fas fa-arrow-circle-right"></i></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminMenu',
  created () {
    this.getResAdminMenuIndex()
  },
  methods: {
    getResAdminMenuIndex () {
      this.$axios.getCookies().then(() => {
        this.$axios.getResAdminMenuIndex().then((res) => {
          const data = res.data.response_data
          this.countOfUsers = data.users || 0
          this.countOfUnlistedUsers = data.unlistedUsers || 0
          this.countOfNewMembers = data.newMembers || 0
          this.countOfLostPassword = data.lostPassword || 0
        })
      })
    }
  },
  data () {
    return {
      countOfUsers: 0,
      countOfUnlistedUsers: 0,
      countOfNewMembers: 0,
      countOfLostPassword: 0
    }
  }
}
</script>
