<template>
  <div>
    <div v-if="thisBiodata.status === 'Admin'">
      <router-view />
    </div>
    <div v-else>
      {{PageNotFound()}}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MenuLayout',
  computed: {
    ...mapGetters('AuthStore', ['thisBiodata'])
  },
  methods: {
    PageNotFound () {
      return this.$router.push({ name: 'PageNotFound' })
    }
  }
}
</script>
