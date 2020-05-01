<template>
  <div class="home-page">
    <div class="wrapper">
      <Navbar />
      <Sidebar />
      <div class="content-wrapper">
        <ContentHeader :title="appTitle" />
        <div class="content">
          <div class="container-fluid">
            <router-view />
          </div>
        </div>
      </div>
      <Footer :app_name="this.$AppHelper.appName()" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Navbar from 'src/components/App/Frame/Navbar'
import Sidebar from 'src/components/App/Frame/Sidebar'
import ContentHeader from 'src/components/App/Frame/ContentHeader'
import Footer from 'src/components/App/Frame/Footer'
export default {
  name: 'PageLayout',
  components: {
    Navbar,
    Sidebar,
    ContentHeader,
    Footer
  },
  async created () {
    // this.isAuthenticated()
  },
  methods: {
    ...mapActions(['auth-store/getBiodata']),
    isAuthenticated () {
      if (!this.$CredMng.credentialKeyTake()) {
        return this.$router.push({ name: 'Login' })
      } else {
        this.getBiodata()
      }
    }
  },
  watch: {
    $route () {
      this.appTitle = this.$route.meta.title
    }
  },
  data () {
    return {
      appTitle: this.$route.meta.title
    }
  }
}
</script>
