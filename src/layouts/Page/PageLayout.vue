<template>
  <div class="home-page sidebar-mini layout-fixed layout-navbar-fixed">
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
export default {
  name: 'PageLayout',
  components: {
    Navbar: () => import('src/components/App/Frame/Navbar'),
    Sidebar: () => import('src/components/App/Frame/Sidebar'),
    ContentHeader: () => import('src/components/App/Frame/ContentHeader'),
    Footer: () => import('src/components/App/Frame/Footer')
  },
  async created () {
    this.isAuthenticated()
  },
  methods: {
    ...mapActions('AuthStore', ['getBiodata']),
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
