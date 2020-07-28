<template>
  <div id="lost-password-list">
    <div class="card">
      <div class="card-body">
        <div>
          <ResourceSearch condition="lostpassword" />
        </div>
        <div class="table-responsive">
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
              <tr v-if="!listOfUsers.length">
                <td
                  colspan="4"
                  class="text-center"
                  :id="`${dataTableName}_value`"
                ></td>
                <td hidden></td>
                <td hidden></td>
                <td hidden></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <ResourcePaginate
            paramName="lostPassword"
            :dataCount="countOfData"
            :query="pageQuery"
            :mainPage="currentPage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UrlHelper from 'src/third-party/helper/url-helper.min'
export default {
  name: 'AdminMenuLostPasswordList',
  components: {
    ResourceSearch: () => import('pages/Admin/Menu/Component/ResourceSearch'),
    ResourcePaginate: () => import('pages/Admin/Menu/Component/ResourcePaginate')
  },
  created () {
    this.getResourcesData()
  },
  updated () {
    this.$(() => { this.$.fn.dataTable.ext.errMode = 'none'; this.$(`#${this.dataTableName}`).DataTable({ autoWidth: false, responsive: true, lengthChange: false, paging: false, info: false, searching: false, ordering: false }) })
  },
  methods: {
    getResourcesData () {
      this.$axios.getCookies().then(async () => {
        this.updateTableDataInfo('reboot')
        await this.$axios.getResAdminMenuLostPasswordList().then((res) => {
          const data = res.data.response_data
          this.countOfData = data.lostPassword.count
          this.listOfUsers = data.lostPassword.list || []
          this.pageQuery = data.lostPassword.query || []
          this.currentPage = UrlHelper.getUrlParamValue(this.pageQuery.first_page, 'page')
        })
        this.updateTableDataInfo()
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
    },
    updateTableDataInfo (command = '') {
      if (command === 'reboot') {
        this.listOfUsers = []
        this.$(() => this.$(`#${this.dataTableName}_value`).html('<font class="text-primary">Please wait...&ensp;<i class="fas fa-spinner fa-pulse"></i></font>'))
      } else {
        if (this.countOfData < 1) {
          this.$(() => this.$(`#${this.dataTableName}_value`).html('<font class="text-danger">No data available in table</font>'))
        }
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
