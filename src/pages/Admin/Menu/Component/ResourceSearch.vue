<template>
  <div class="row">
    <div class="input-group input-group-sm col-12 offset-md-7 col-md-5">
      <input
        type="text"
        class="form-control border-primary"
        id="searchUser"
        placeholder="Search Name"
        @keyup.enter="searchUserName"
      >
      <span class="input-group-append">
        <button
          type="button"
          class="btn btn-primary text-bold"
          id="btn-search-user"
          @click="searchUserName"
        ><i class="fas fa-search"></i></button>
      </span>
    </div>
  </div>
</template>

<script>
import UrlHelper from 'src/third-party/helper/url-helper.min'
export default {
  name: 'ResourceSearch',
  props: {
    condition: String
  },
  methods: {
    searchUserName () {
      const getName = this.$('#searchUser').val()
      if (getName) {
        this.$axios.getCookies().then(() => {
          this.$parent.updateTableDataInfo('reboot')
          this.$axios.getResAdminMenuSearchUserByName(getName, this.condition).then((res) => {
            if (res.data.status === 'success') {
              const data = res.data.response_data
              this.$parent.countOfData = data.users.count
              this.$parent.listOfUsers = data.users.list || []
              this.$parent.pageQuery = data.users.query || []
              this.$parent.currentPage = UrlHelper.getUrlParamValue(this.$parent.pageQuery.first_page, 'page')
            } else {
              this.$Notify.notifyResponseArray(res.data.message, 'info')
              this.$parent.countOfData = 0
            }
            this.$parent.updateTableDataInfo()
          })
        })
      } else {
        this.$parent.getResourcesData()
      }
    }
  }
}
</script>
