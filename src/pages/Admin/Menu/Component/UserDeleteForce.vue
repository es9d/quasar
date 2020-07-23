<template>
  <div id="user-delete-forever">
    <p class="text-bold text-center">--- User Delete Forever ---</p>
    <div class="border border-danger rounded">
      <div class="mx-3 my-4">
        <h6 class="text-danger">
          This action will delete this user from membership.
        </h6>
        <h6 class="text-danger">
          <i class="fas fa-exclamation-triangle"></i> Warning, once deleted you cannot restore this user.<br>
        </h6>
        <button
          class="btn btn-outline-danger text-bold mt-2"
          @click="forceDeleteUser"
        ><i class="fas fa-trash"></i>&ensp;Delete User Forever</button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'UserDeleteForce',
  props: {
    defaultReturn: String
  },
  methods: {
    forceDeleteUser () {
      Swal.fire({
        title: 'Are you sure ?',
        text: 'Delete forever this user from membership',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete!',
        cancelButtonText: 'Cancel'
      }).then(async result => {
        if (result.value) {
          this.$axios.getCookies().then(() => {
            this.$axios.deleteAdminMenuUserDelete(this.appTimeNow, this.userCode, 'force').then(async res => {
              if (res.data.status === 'success') {
                await Swal.fire('Success', `${res.data.message}`, 'success')
                return this.$router.push({ name: this.defaultReturn })
              } else Swal.fire('Failed', `${res.data.message}`, 'error')
            })
          })
        }
      })
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
