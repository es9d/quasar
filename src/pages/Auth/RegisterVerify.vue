<template>
  <div class="login-box">
    <div class="login-logo text-white">{{this.$AppHelper.appName()}}</div>
    <div class="card">
      <div class="card-body login-card-body">
        <p class="login-box-msg">Please wait, we'll verify your account.</p>
        <p
          class
          id="process-message"
        ></p>
      </div>
    </div>
  </div>
</template>

<script>
import AwSleep from 'src/third-party/helper/await-sleep.min.js'
export default {
  name: 'RegisterVerify',
  created () {
    this.processAccess()
  },
  methods: {
    async processAccess () {
      await AwSleep.sleep(500)
      if (this.tokenAccess.length !== 32) {
        return this.$router.push({ name: 'Login' })
      }
      this.responseMessage('#process-message', 'info', 'Processing')
      await AwSleep.sleep(2000)
      this.verifyAccess()
    },
    verifyAccess () {
      this.$axios.getCookies().then(() => {
        this.$axios
          .postVerifyRegister(this.tokenAccess)
          .then(async res => {
            this.responseMessage(
              '#process-message',
              `${res.data.status}`,
              `${res.data.message}`
            )
            await AwSleep.sleep(2000)
            this.responseMessage('#process-message', 'info', 'Redirect')
            await AwSleep.sleep(3000)
            return this.$router.push({ name: 'Login' })
          })
          .catch(async err => {
            this.responseMessage(
              '#process-message',
              'error',
              err.message
            )
            await AwSleep.sleep(2000)
            this.responseMessage('#process-message', 'info', 'Redirect')
            await AwSleep.sleep(3000)
            return this.$router.push({ name: 'Login' })
          })
      })
    },
    responseMessage (goto, status, message) {
      this.$(goto).removeClass()
      this.$(goto).html('')
      const stat = {
        success: {
          color: 'success',
          icon: '<i class="far fa-check-circle"></i>'
        },
        error: {
          color: 'danger',
          icon: '<i class="far fa-times-circle"></i>'
        },
        info: {
          color: 'info',
          icon: '<i class="fas fa-spinner fa-pulse"></i>'
        }
      }
      this.$(goto).addClass(`text-bold text-center text-${stat[status].color}`)
      this.$(goto).html(`${message} ${stat[status].icon}`)
    }
  },
  data () {
    return {
      tokenAccess: this.$route.params.access
    }
  }
}
</script>
