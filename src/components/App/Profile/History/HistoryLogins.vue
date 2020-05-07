<template>
  <div id="login-histories">
    <div v-if="userLoginHistory">
      <button
        class="btn float-right btn-text btn-sm text-sm text-primary"
        id="history-login-more-btn"
        @click="showMoreLoginHistory"
      ><i class="fas fa-angle-double-up"></i>&ensp;show {{btnLoginHistory}}</button>
      <div class="table-responsive p-0">
        <table class="table table-hover text-nowrap table-borderless">
          <tbody>
            <tr
              v-for="(logs,idx) in userLoginHistory"
              :key="idx"
            >
              <td class="w-75">
                <div class="row text-secondary text-sm">
                  <div class="col-12"><i class="far fa-calendar-alt"></i>&ensp;{{logs.date_time}}</div>
                  <div class="col-12"><i :class="`fas fa-${logs.device_type == 'mobile' ? 'mobile-alt' : (logs.device_type == 'tablet' ? 'tablet-alt' : 'desktop')}`"></i>&ensp;{{logs.device_name}}</div>
                  <div class="col-12"><i class="fas fa-network-wired"></i>&ensp;{{logs.ip_address}}</div>
                </div>
              </td>
              <td class="w-25">
                <router-link
                  :to="{name:'HistoryLogin', params:{log_code:logs.log_code}}"
                  class="btn btn-light btn-sm btn-block text-bold"
                ><i class="fas fa-info-circle"></i>&ensp;detail</router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else>
      <div class="alert alert-secondary">
        <p class="text-bold">Do you have no login history?</p>
        <p class="text-bold">Hmm.. Interesting..</p>
        <p class="text-bold">So.. how can you came in this page?</p>
        <p class="text-bold">Some miracle?</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'HistoryLogin',
  created () {
    this.getUserLoginHistory('last-week')
  },
  computed: {
    ...mapGetters('HistoryLogin', ['userLoginHistory'])
  },
  methods: {
    ...mapActions('HistoryLogin', ['getUserLoginHistory']),
    showMoreLoginHistory () {
      if (this.btnLoginHistory === 'last month') {
        this.getUserLoginHistory('last-month')
        this.btnLoginHistory = 'all'
      } else if (this.btnLoginHistory === 'all') {
        this.getUserLoginHistory('all')
        this.$('#history-login-more-btn').hide(500)
      }
    }
  },
  data () {
    return {
      btnLoginHistory: 'last month'
    }
  }
}
</script>
