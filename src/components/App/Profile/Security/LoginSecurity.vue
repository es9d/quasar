<template>
  <div id="security">
    <p class="text-bold text-center">--- Profile Security ---</p>
    <div
      class="border border-danger rounded"
      id="login-security"
    >
      <div class="h6 text-danger mx-3 my-4">
        Delete your session from all devices where you are logged in.<br>
        <i class="fas fa-exclamation-triangle"></i> Warning, all sessions from your device will be deleted, so you will need to log in again.<br>
        <button
          class="btn btn-outline-danger text-bold mt-3"
          @click="revokeSessions"
        ><i class="fas fa-sign-out-alt"></i>&ensp;Revoke All Sessions</button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'LoginSecurity',
  methods: {
    revokeSessions () {
      Swal.fire({
        title: 'Are you sure ?',
        text: 'It will close session from this app',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, im Sure!',
        cancelButtonText: 'Cancel'
      }).then(async result => {
        if (result.value) {
          await this.$axios
            .postLogoutRevokes()
            .then(async res => {
              if (res.data.status === 'success') {
                this.$Notify.notifySuccess(res.data.message)
              } else {
                this.$Notify.notifyError(res.data.message)
              }
            })
            .catch(error => {
              this.$Notify.notifyError(error.message)
            })
          await this.$CredMng.credentialKeyRemove()
          return this.$router.push({ name: 'Login' })
        }
      })
    }
  }
}
</script>
