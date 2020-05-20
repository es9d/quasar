<template>
  <div
    class="container-fluid"
    id="login-history-detail"
  >
    <div v-if="logDetailData">
      <div class="card card-outline card-primary">
        <div class="card-body">
          <table class="table table-borderless table-sm">
            <tbody>
              <tr>
                <td
                  class="text-bold"
                  colspan="2"
                >User Log</td>
              </tr>
              <tr>
                <td colspan="2">
                  <div class="user-panel d-flex">
                    <div class="image">
                      <img
                        :src="asset_img+logDetailData.user_img"
                        class="img-circle"
                        alt="Profile Image"
                      />
                    </div>
                    <div class="info">{{logDetailData.user_name}}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td
                  class="text-bold"
                  colspan="2"
                >Date Time</td>
              </tr>
              <tr>
                <td class="text-center"><i class="far fa-calendar-alt fa-lg"></i></td>
                <td>{{logDetailData.date_time}}</td>
              </tr>
              <tr>
                <td
                  class="text-bold"
                  colspan="2"
                >Login At</td>
              </tr>
            </tbody>
            <tbody v-if="(logDetailData.device_info.devType == 'mobile') || (logDetailData.device_info.devType == 'tablet')">
              <tr>
                <td class="text-center"><i :class="`fab fa-${iconConvert(logDetailData.device_info.osName)} fa-lg`"></i></td>
                <td>{{logDetailData.device_info.osName}} - {{logDetailData.device_info.osVersion}}</td>
              </tr>
              <tr>
                <td class="text-center"><i :class="`fas fa-${logDetailData.device_info.devType}-alt fa-lg`"></i></td>
                <td>{{logDetailData.device_info.mobileVendor}} - {{logDetailData.device_info.mobileModel}}</td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td class="text-center"><i :class="`fab fa-${iconConvert(logDetailData.device_info.osName)} fa-lg`"></i></td>
                <td>{{logDetailData.device_info.osName}} - {{logDetailData.device_info.osVersion}}</td>
              </tr>
              <tr>
                <td class="text-center"><i :class="`fab fa-${iconConvert(logDetailData.device_info.browserName)} fa-lg`"></i></td>
                <td>{{logDetailData.device_info.browserName}} - {{logDetailData.device_info.browserVersion}}</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td class="text-center"><i class="fas fa-network-wired fa-lg"></i></td>
                <td>{{logDetailData.ip_address}}</td>
              </tr>
              <tr>
                <td
                  class="text-bold"
                  colspan="2"
                >User Agent</td>
              </tr>
              <tr>
                <td class="text-center"><i class="fas fa-cogs fa-lg"></i></td>
                <td>{{logDetailData.device_info.getUA}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          class="overlay dark"
          id="history-loading"
        >
          <i class="fas fa-2x fa-sync-alt fa-spin"></i>
        </div>
      </div>
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
        this.$axios.getUserLoginHistoryByCode(this.logCode).then(res => {
          if (res.data.status === 'success') {
            this.$(() => this.$('#history-loading').hide())
            if (res.data.response_data.length) this.logDetailData = res.data.response_data[0]
            else this.$router.push({ name: 'Profile' })
          }
        }).catch((err) => this.catchError(err))
      })
    },
    iconConvert (osName) {
      if (osName === 'iOS') return 'apple'
      else if (osName === 'Chromium') return 'chrome'
      else return osName.toLowerCase()
    },
    catchError (err) {
      this.$Notify.notifyError(err.message)
      console.log(err)
    }
  },
  data () {
    return {
      asset_img: this.$AppHelper.apiEndpoint(),
      logCode: this.$route.params.log_code,
      logDetailData: null
    }
  }
}
</script>
