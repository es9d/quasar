<template>
  <div id="user-restore">
    <p class="text-bold text-center">--- User Restore ---</p>
    <div class="border border-info rounded">
      <div class="mx-3 my-4">
        <h6 class="text-info">
          This action will restore this user from membership.
        </h6>
        <button
          class="btn btn-outline-info text-bold mt-2"
          @click="restoreUser"
        ><i class="fas fa-trash-restore"></i>&ensp;Restore User</button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'UserRestore',
  props: {
    defaultReturn: String
  },
  methods: {
    restoreUser () {
      Swal.fire({
        title: 'Are you sure ?',
        text: 'Restore this user from membership',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Restore!',
        cancelButtonText: 'Cancel'
      }).then(async result => {
        if (result.value) {
          this.$axios.getCookies().then(() => {
            this.$axios.patchAdminMenuUserRestore(this.appTimeNow, this.userCode).then(async res => {
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
