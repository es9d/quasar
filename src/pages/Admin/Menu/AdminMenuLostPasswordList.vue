<template>
  <div id="lost-password-list">
    <div class="card">
      <div class="card-body table-responsive">
        <table
          id="list-user-table"
          class="table table-borderless table-hover"
        >
          <thead>
            <tr class="text-center">
              <th>Name</th>
              <th>Active</th>
              <th>Last Login</th>
              <th>Request at</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(user, idx) in listOfLostPassword"
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
                      :to="{ name: 'AdminMenuLostPasswordDetail', params:{code:user.code} }"
                      class="d-block"
                    >{{user.name}}</router-link>
                  </div>
                </div>
              </td>
              <td
                class="text-center"
                v-html="userActiveConvert(user.active)"
              />
              <td class="text-center">{{user.last_login}}</td>
              <td class="text-center">{{user.request_at}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminMenuLostPasswordList',
  created () {
    this.getResAdminMenuLostPasswordList()
  },
  updated () {
    this.$(() => { this.$.fn.dataTable.ext.errMode = 'none'; this.$('#list-user-table').DataTable({ autoWidth: false, responsive: true }) })
  },
  methods: {
    getResAdminMenuLostPasswordList () {
      this.$axios.getCookies().then(() => {
        this.$axios.getResAdminMenuLostPasswordList().then((res) => {
          const data = res.data.response_data
          this.listOfLostPassword = data.lostPassword.list || []
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
      listOfLostPassword: []
    }
  }
}
</script>
