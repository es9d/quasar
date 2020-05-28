<template>
  <div id="lost-password-request-management">
    <p class="text-bold text-center">--- Lost Password Management ---</p>
    <div class="border border-danger rounded">
      <div class="mx-3 my-4">
        <h6 class="text-muted text-sm">
          Request at : <code>{{requestAccess.request_at}}</code>.
        </h6>
        <button
          class="btn btn-outline-danger text-bold mt-2"
          @click="deleteLostPassRequest"
        ><i class="fas fa-trash"></i>&ensp;Delete Request</button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'UserLostPasswordReqMng',
  props: {
    requestAccess: null,
    defaultReturn: String
  },
  methods: {
    deleteLostPassRequest () {
      Swal.fire({
        title: 'Are you sure ?',
        text: 'Delete this lost password request',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete!',
        cancelButtonText: 'Cancel'
      }).then(async result => {
        if (result.value) {
          this.$axios.getCookies().then(() => {
            this.$axios.deleteAdminMenuLostPasswordRequest(this.appTimeNow, this.requestAccess.access).then(async res => {
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
      appTimeNow: new Date().getTime()
    }
  }
}
</script>
