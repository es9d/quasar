<template>
  <div
    class="container-fluid"
    id="login-history-detail"
  >
    <div v-if="logDetailData">
      <dl class="text-sm">
        <dt><i class="far fa-calendar-alt"></i>&ensp;Date Time</dt>
        <dd>{{logDetailData.date_time}}</dd>
        <div v-if="logDetailData.device_info.devType == 'mobile'">
          <dt>Login At :</dt>
          <dd><i :class="`fab fa-${iconConvert(logDetailData.device_info.osName)} fa-lg`"></i>&emsp;{{logDetailData.device_info.osName}} - {{logDetailData.device_info.osVersion}}</dd>
          <dd><i :class="`fas fa-${logDetailData.device_info.devType}-alt fa-lg`"></i>&emsp;{{logDetailData.device_info.mobileVendor}} - {{logDetailData.device_info.mobileModel}}</dd>
          <dd><i class="fas fa-network-wired fa-lg"></i>&ensp;{{logDetailData.ip_address}}</dd>
          <dt>User Agent :</dt>
          <dd><i class="fas fa-cogs fa-lg"></i>&emsp;{{logDetailData.device_info.getUA}}</dd>
        </div>

        <!-- <div v-else-if="logDetailData.device_info.devType == 'tablet'">wdw</div>
      <div v-else>dwad</div> -->
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HistoryLogin',
  created () {
    this.getLoginDetail()
  },
  methods: {
    getLoginDetail () {
      this.$axios.getCookies().then(() => {
        this.$axios.getUserLoginHistoryByCode(this.logCode).then((res) => {
          if (res.data.status === 'success') {
            if (res.data.response_data.length) this.logDetailData = res.data.response_data[0]
            else this.$router.push({ name: 'Profile' })
          }
        }).catch((err) => this.catchError(err))
      })
    },
    iconConvert (osName) {
      if (osName === 'iOS') return 'apple'
      else return osName.toLowerCase()
    },
    catchError (err) {
      this.$Notify.notifyError(err.message)
      console.log(err)
    }
  },
  data () {
    return {
      logCode: this.$route.params.log_code,
      logDetailData: null
    }
  }
}
</script>
