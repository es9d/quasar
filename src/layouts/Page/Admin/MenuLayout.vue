<template>
  <router-view />
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MenuLayout',
  async created () {
    await this.checkIsAdmin()
  },
  computed: {
    ...mapGetters('AuthStore', ['thisBiodata'])
  },
  methods: {
    checkIsAdmin () {
      const status = this.thisBiodata.status
      if (status !== 'Admin') this.$router.push({ name: 'Home' })
    }
  }
}
</script>
