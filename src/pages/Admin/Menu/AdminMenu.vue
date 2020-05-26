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
        <div class="small-box bg-success">
          <div class="inner">
            <h3>53<sup style="font-size: 20px">%</sup></h3>
            <p>Bounce Rate</p>
          </div>
          <div class="icon">
            <i class="ion ion-stats-bars"></i>
          </div>
          <router-link
            :to="{name:'AdminMenuUserList'}"
            class="small-box-footer"
          >More info <i class="fas fa-arrow-circle-right"></i></router-link>
        </div>
      </div>
      <div class="col-12 col-sm-6 col-lg-3">
        <div class="small-box bg-warning">
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
        <div class="small-box bg-danger">
          <div class="inner">
            <h3>65</h3>
            <p>Unique Visitors</p>
          </div>
          <div class="icon">
            <i class="ion ion-pie-graph"></i>
          </div>
          <router-link
            :to="{name:'AdminMenuUserList'}"
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
          this.countOfNewMembers = data.newMembers || 0
        })
      })
    }
  },
  data () {
    return {
      countOfUsers: 0,
      countOfNewMembers: 0
    }
  }
}
</script>
