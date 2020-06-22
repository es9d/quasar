<template>
  <div id="users-list">
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
              <th>Registered</th>
              <th>Last Login</th>
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
              <td
                class="text-center"
                v-html="userActiveConvert(user.active)"
              />
              <td class="text-center">{{user.registered}}</td>
              <td class="text-center">{{user.last_login}}</td>
            </tr>
          </tbody>
        </table>
        <div class="btn-group float-right mt-1">
          <button
            type="button"
            class="btn btn-default"
            @click="gotoPage('first')"
          >First</button>
          <button
            type="button"
            class="btn btn-default"
            @click="gotoPage('prev')"
          >Previous</button>
          <button class="btn btn-default">{{currentPage}}</button>
          <button
            type="button"
            class="btn btn-default"
            @click="gotoPage('next')"
          >Next</button>
          <button
            type="button"
            class="btn btn-default"
            @click="gotoPage('last')"
          >Last</button>
        </div>
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
    this.$(() => { this.$.fn.dataTable.ext.errMode = 'none'; this.$(`#${this.dataTableName}`).DataTable({ autoWidth: false, responsive: true, lengthChange: false, paging: false, info: false }) })
  },
  methods: {
    getResAdminMenuUsersList () {
      this.$axios.getCookies().then(() => {
        this.$axios.getResAdminMenuUsersList().then((res) => {
          const data = res.data.response_data
          this.listOfUsers = data.users.list || []
          this.pageQuery = data.users.query || []
        })
      })
    },
    getAnotherDataPaginates (url) {
      this.$axios.getCookies().then(() => {
        this.$axios.getResAdminMenuDynamicUrl(url).then((res) => {
          const data = res.data.response_data
          this.listOfUsers = data.users.list || []
          this.pageQuery = data.users.query || []
        })
      })
    },
    urlManipulator (url, param) {
      const urlParams = new URLSearchParams(url)
      return urlParams.get(param) || 1
    },
    gotoPage (goto) {
      if ((goto === 'next') && this.pageQuery.next_page) {
        this.getAnotherDataPaginates(this.pageQuery.next_page); this.currentPage = this.urlManipulator(this.pageQuery.next_page, 'page')
      }
      if ((goto === 'prev') && this.pageQuery.prev_page) {
        this.getAnotherDataPaginates(this.pageQuery.prev_page); this.currentPage = this.urlManipulator(this.pageQuery.prev_page, 'page')
      }
      if ((goto === 'first') && this.pageQuery.first_page) {
        this.getAnotherDataPaginates(this.pageQuery.first_page); this.currentPage = this.urlManipulator(this.pageQuery.first_page, 'page')
      }
      if ((goto === 'last') && this.pageQuery.last_page) {
        this.getAnotherDataPaginates(this.pageQuery.last_page); this.currentPage = this.urlManipulator(this.pageQuery.last_page, 'page')
      }
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
      dataTableName: 'list-user-table',
      listOfUsers: [],
      pageQuery: [],
      currentPage: 1
    }
  }
}
</script>
