<template>
  <div class="row mb-1">
    <div class="input-group col-12 offset-md-7 col-md-5">
      <input
        type="text"
        class="form-control"
        id="searchUser"
        placeholder="Search Name"
        @keyup.enter="searchUserName"
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
</template>

<script>
import UrlHelper from 'src/third-party/helper/url-helper.min'
export default {
  name: 'ResourceSearch',
  methods: {
    searchUserName () {
      const getName = this.$('#searchUser').val()
      if (getName) {
        this.$axios.getCookies().then(() => {
          this.$axios.getResAdminMenuSearchUserByName(getName).then((res) => {
            if (res.data.status === 'success') {
              const data = res.data.response_data
              this.$parent.countOfData = data.users.count
              this.$parent.listOfUsers = data.users.list || []
              this.$parent.pageQuery = data.users.query || []
              this.$parent.currentPage = UrlHelper.getUrlParamValue(this.$parent.pageQuery.first_page, 'page')
            } else {
              this.$Notify.notifyResponseArray(res.data.message, 'info')
            }
          })
        })
      } else {
        this.$parent.getResAdminMenuUsersList()
      }
    }
  }
}
</script>
