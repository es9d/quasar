<template>
  <div id="users-list">
    <div class="card">
      <div class="card-body table-responsive">
        <ResourceSearch />
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
        <ResourcePaginate
          :dataCount="countOfData"
          :query="pageQuery"
          :mainPage="currentPage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import UrlHelper from 'src/third-party/helper/url-helper.min'
export default {
  name: 'AdminMenuUserList',
  components: {
    ResourceSearch: () => import('pages/Admin/Menu/Component/ResourceSearch'),
    ResourcePaginate: () => import('pages/Admin/Menu/Component/ResourcePaginate')
  },
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
          this.currentPage = UrlHelper.getUrlParamValue(this.pageQuery.first_page, 'page')
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
      dataTableName: 'list-user-table',
      listOfUsers: [],
      pageQuery: [],
      currentPage: 1,
      countOfData: 0
    }
  }
}
</script>
