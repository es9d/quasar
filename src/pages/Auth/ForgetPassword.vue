<template>
  <div class="login-box">
    <div class="login-logo text-white">{{this.$AppHelper.appName()}}</div>
    <div class="card">
      <div class="card-body login-card-body rounded">
        <p class="login-box-msg">You forgot your password? Here you can easily retrieve a new password.</p>
        <div class="input-group mb-3">
          <input
            type="email"
            class="form-control theInput"
            id="input-email"
            placeholder="E-Mail"
            @keyup.enter="gotoSubmit"
            v-model="thisEmail"
          />
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-at"></span>
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-12">
            <button
              type="submit"
              class="btn btn-primary btn-block text-bold"
              id="input-submit"
              @click="sendAlertMessage"
            >
              <i class="fas fa-paper-plane"></i>&ensp;Request new password
            </button>
          </div>
        </div>
        <p class="mb-1">
          <router-link
            :to="{ name: 'Login' }"
            class="text-center"
          >
            <i class="fas fa-sign-in-alt"></i>&ensp;Login
          </router-link>
        </p>
        <p class="mb-0">
          <router-link
            :to="{ name: 'Register' }"
            class="text-center"
          >
            <i class="fas fa-user-plus"></i>&ensp;Register a new membership
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'ForgetPassword',
  methods: {
    sendAlertMessage () {
      Swal.fire({
        title: 'Request new password?',
        text: 'the request will be sent to your account',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancel!',
        confirmButtonText: 'Yes, send now!'
      }).then(async result => {
        if (result.value) {
          this.$(() => this.$('#input-submit').prop('disabled', true))
          await this.sendRequest()
          this.$(() => this.$('#input-submit').prop('disabled', false))
        }
      })
    },
    sendRequest () {
      this.$axios.getCookies().then(() => {
        this.$axios
          .postLostPassword(this.thisEmail)
          .then(async res => {
            await Swal.fire(
              `${res.data.status === 'success' ? 'Success!' : 'Failed!'}`,
              `${this.responseArrayMessage(res.data.message)}`,
              `${res.data.status}`
            )
            return this.$router.push({ name: 'Login' })
          })
          .catch(async err => {
            await Swal.fire('Oppss!', `${err.message}`, 'error')
          })
      })
    },
    responseArrayMessage (data) {
      let errorMsg = ''
      if (typeof data === 'object') {
        if (data.email) {
          data.email.forEach(msg => {
            errorMsg += errorMsg ? `, ${msg}` : msg
          })
        }
      } else {
        errorMsg += data
      }
      return errorMsg
    },
    gotoSubmit () {
      this.$('#input-submit').click()
    }
  },
  data () {
    return {
      thisEmail: ''
    }
  }
}
</script>
