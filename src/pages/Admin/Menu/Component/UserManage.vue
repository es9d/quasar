<template>
  <div id="user-manage">
    <p class="text-bold text-center">--- User Manage ---</p>
    <div class="row">
      <div class="col-12 col-sm-6">
        <form @submit.prevent="submitNewActive">
          <div class="form-group">
            <label>Set User Active Status</label>
            <select
              class="custom-select"
              id="new-user-active-status"
              :value="userActiveStatusNow"
            >
              <option value="Active">Active</option>
              <option value="Suspend">Suspend</option>
              <option value="Block">Block</option>
            </select>
          </div>
          <button
            type="submit"
            class="btn btn-primary btn-block text-bold"
          >Save New Active Status</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'UserManage',
  props: {
    userActiveStatusNow: String
  },
  methods: {
    submitNewActive () {
      if (this.userActiveStatusNow === this.$('#new-user-active-status').val()) {
        Swal.fire('Waitt', 'Please select new active status.', 'warning')
      } else {
        Swal.fire({
          title: 'Are you sure?',
          text: 'Update new active status user',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, update now!'
        }).then((result) => {
          if (result.value) {
            this.$axios.getCookies().then(() => {
              this.$axios.patchAdminMenuSetNewUserActiveStatus(this.appTimeNow, this.userCode, this.$('#new-user-active-status').val()).then(async res => {
                if (res.data.status === 'success') {
                  await Swal.fire('Success', `${res.data.message}`, 'success')
                  this.$parent.getResAdminMenuUserDetail()
                } else {
                  Swal.fire('Sorry', `${res.data.message}`, 'error')
                }
              })
            })
          }
        })
      }
    }
  },
  data () {
    return {
      appTimeNow: new Date().getTime(),
      userCode: this.$route.params.code
    }
  }
}
</script>
