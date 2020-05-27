<template>
  <div id="user-register-confirm">
    <p class="text-bold text-center">--- New Member Confirm ---</p>
    <button
      class="btn btn-info text-bold"
      @click="userRegisterConfirm"
    ><i class="fas fa-check"></i>&ensp;Confirm this member</button>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'UserRegisterConfirm',
  props: {
    registerAccess: String
  },
  methods: {
    userRegisterConfirm () {
      Swal.fire({
        title: 'Are you sure ?',
        text: 'Member will be confirmed automatically',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Confirm!',
        cancelButtonText: 'Cancel'
      }).then(async result => {
        if (result.value) {
          this.$axios.getCookies().then(() => {
            this.$axios.postVerifyRegister(this.registerAccess).then(async res => {
              if (res.data.status === 'success') {
                await Swal.fire('Success', `${res.data.message}`, 'success')
                return this.$router.push({ name: 'AdminMenuNewMemberList' })
              } else Swal.fire('Failed', `${res.data.message}`, 'error')
            })
          })
        }
      })
    }
  },
  data () {
    return {
      userCode: this.$route.params.code
    }
  }
}
</script>
