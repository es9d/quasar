<template>
  <div id="users-list">
    <div class="card">
      <div class="card-body">
        <table
          id="list-user-table"
          class="table table-bordered table-hover"
        >
          <thead>
            <tr class="text-center">
              <th>Name</th>
              <th>Status</th>
              <th>Active</th>
              <th>Registered</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(user, idx) in listOfUsers"
              :key="idx"
            >
              <td>
                <div class="user-panel d-flex">
                  <div class="image">
                    <img
                      :src="asset_img+user.profile_img"
                      class="img-circle"
                      alt="Profile Image"
                    />
                  </div>
                  <div class="info">
                    <router-link
                      :to="{ name: 'AdminMenuUserDetail', params:{code:user.code} }"
                      class="d-block"
                    >{{user.name}}</router-link>
                  </div>
                </div>
              </td>
              <td class="text-center">{{user.status}}</td>
              <td
                class="text-center"
                v-html="userActiveConvert(user.active)"
              />
              <td class="text-center">{{user.registered}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminMenuUserList',
  created () {
    this.getResAdminMenuUsersList()
  },
  updated () {
    this.$(() => { this.$('#list-user-table').DataTable({ autoWidth: false, responsive: true }) })
  },
  methods: {
    getResAdminMenuUsersList () {
      this.$axios.getCookies().then(() => {
        this.$axios.getResAdminMenuUsersList().then((res) => {
          const data = res.data.response_data
          this.listOfUsers = data.users.list || []
        })
      })
    },
    userActiveConvert (status) {
      if (status === 'Suspend') {
        return `<font class="text-bold text-warning"><i class="fas fa-exclamation-circle"></i>&ensp;${status}</font>`
      } else if (status === 'Block') {
        return `<font class="text-bold text-danger"><i class="far fa-times-circle"></i>&ensp;${status}</font>`
      } else {
        return `<font class="text-bold text-success"><i class="far fa-check-circle"></i>&ensp;${status}</font>`
      }
    }
  },
  data () {
    return {
      asset_img: this.$AppHelper.apiEndpoint(),
      listOfUsers: []
    }
  }
}
</script>
