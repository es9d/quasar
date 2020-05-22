<template>
  <div
    class="table-responsive"
    id="user-history"
  >
    <p class="text-bold text-center">--- Login History ---</p>
    <table
      class="table table-borderless table-hover"
      id="list-user-history"
    >
      <thead>
        <tr class="text-center">
          <th>Device Name</th>
          <th>Device Type</th>
          <th>IP Address</th>
          <th>Date</th>
          <th>Detail</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(hist, idx) in userHistory"
          :key="idx"
        >
          <td>{{hist.device_name}}</td>
          <td>{{hist.device_type}}</td>
          <td>{{hist.ip_address}}</td>
          <td>{{hist.date_time}}</td>
          <td class="text-center">
            <router-link
              :to="{name:'HistoryLogin', params:{log_code:hist.log_code}}"
              class="fas fa-info-circle fa-lg text-secondary"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'UserHistory',
  updated () {
    this.$(() => { this.$.fn.dataTable.ext.errMode = 'none'; this.$('#list-user-history').DataTable({ autoWidth: false, responsive: true, ordering: false }) })
  },
  props: {
    userHistory: null
  }
}
</script>
