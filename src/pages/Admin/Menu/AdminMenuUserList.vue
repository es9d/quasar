<template>
  <div id="users-list">
    <div class="card">
      <div class="card-body table-responsive">
        <div class="row mb-1">
          <div class="input-group col-12 offset-md-7 col-md-5">
            <input
              type="text"
              class="form-control"
              :id="dataTableName+'_search'"
              placeholder="Search Name"
              @keyup.enter="goToSearchName"
            >
            <span class="input-group-append">
              <button
                type="button"
                class="btn btn-outline-info"
                id="btn-search-user"
                @click="searchUserName"
              >Search</button>
            </span>
          </div>
        </div>
        <table
          :id="dataTableName"
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
            <tr v-if="!listOfUsers.length">
              <td
                colspan="4"
                class="text-center"
              >No data available in table</td>
            </tr>
          </tbody>
        </table>
        <p
          v-if="countOfData != 0"
          class="text-muted text-sm"
        >Showing {{pageQuery.data_from}} to {{pageQuery.data_to}} of {{countOfData}} entries</p>
        <div
          class="btn-group pagination mt-1"
          v-if="listOfUsers.length"
        >
          <button
            type="button"
            class="btn btn-outline-info"
            @click="gotoPage('first')"
          >First</button>
          <button
            type="button"
            class="btn btn-outline-info"
            @click="gotoPage('prev')"
          >Previous</button>
          <span class="btn btn-outline-info">{{currentPage}}</span>
          <button
            type="button"
            class="btn btn-outline-info"
            @click="gotoPage('next')"
          >Next</button>
          <button
            type="button"
            class="btn btn-outline-info"
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
    this.$(() => { this.$.fn.dataTable.ext.errMode = 'none'; this.$(`#${this.dataTableName}`).DataTable({ autoWidth: false, responsive: true, lengthChange: false, paging: false, info: false, searching: false }) })
  },
  methods: {
    getResAdminMenuUsersList () {
      this.$axios.getCookies().then(() => {
        this.$axios.getResAdminMenuUsersList().then((res) => {
          const data = res.data.response_data
          this.countOfData = data.users.count
          this.listOfUsers = data.users.list || []
          this.pageQuery = data.users.query || []
          this.currentPage = this.getPageFromUrlPaginate(this.pageQuery.first_page, 'page')
        })
      })
    },
    getAnotherDataPaginates (url) {
      this.$axios.getCookies().then(() => {
        this.$axios.getResAdminMenuDynamicUrl(url).then((res) => {
          if (res.data.status === 'success') {
            const data = res.data.response_data
            this.listOfUsers = data.users.list || []
            this.pageQuery = data.users.query || []
            this.currentPage = this.getPageFromUrlPaginate(url, 'page')
          } else {
            this.$Notify.notifyInfo(res.data.message)
          }
        })
      })
    },
    searchUserName () {
      const getName = this.$(`#${this.dataTableName}_search`).val()
      if (getName) {
        this.$axios.getCookies().then(() => {
          this.$axios.getResAdminMenuSearchUserByName(getName).then((res) => {
            if (res.data.status === 'success') {
              const data = res.data.response_data
              this.countOfData = data.users.count
              this.listOfUsers = data.users.list || []
              this.pageQuery = data.users.query || []
              this.currentPage = this.getPageFromUrlPaginate(this.pageQuery.first_page, 'page')
            } else {
              this.$Notify.notifyResponseArray(res.data.message, 'info')
            }
          })
        })
      } else {
        this.getResAdminMenuUsersList()
      }
    },
    getPageFromUrlPaginate (url, param) {
      const urlParams = new URLSearchParams(url)
      return urlParams.get(param) || 1
    },
    gotoPage (goto) {
      if ((goto === 'next') && this.pageQuery.next_page) this.getAnotherDataPaginates(this.pageQuery.next_page)
      if ((goto === 'prev') && this.pageQuery.prev_page) this.getAnotherDataPaginates(this.pageQuery.prev_page)
      if ((goto === 'first') && this.pageQuery.first_page) this.getAnotherDataPaginates(this.pageQuery.first_page)
      if ((goto === 'last') && this.pageQuery.last_page) this.getAnotherDataPaginates(this.pageQuery.last_page)
    },
    userActiveConvert (status) {
      if (status === 'Suspend') {
        return `<font class="text-bold text-warning"><i class="fas fa-exclamation-circle"></i>&ensp;${status}</font>`
      } else if (status === 'Block') {
        return `<font class="text-bold text-danger"><i class="far fa-times-circle"></i>&ensp;${status}</font>`
      } else {
        return `<font class="text-bold text-success"><i class="far fa-check-circle"></i>&ensp;${status}</font>`
      }
    },
    goToSearchName () {
      this.$(() => this.$('#btn-search-user').click())
    }
  },
  data () {
    return {
      asset_img: this.$AppHelper.apiEndpoint(),
      dataTableName: 'list-user-table',
      listOfUsers: [],
      pageQuery: [],
      currentPage: 1,
      countOfData: 0
    }
  }
}
</script>

<style lang="stylus" scoped>
.btn-group-wrap {
  text-align: center;
}

div.btn-group {
  margin: 0 auto;
  text-align: right;
  width: inherit;
  display: inline-block;
}
</style>
