<template>
  <aside class="main-sidebar sidebar-dark-olive elevation-4">
    <router-link
      :to="{ name: 'Home' }"
      class="brand-link"
    >
      <img
        :src="`${this.$AppHelper.assetOrigin()}/dist/img/AdminLTELogo.png`"
        alt="AdminLTE Logo"
        class="brand-image img-circle elevation-3"
        style="opacity: .8"
      />
      <span class="brand-text font-weight-light">{{this.$AppHelper.appName()}}</span>
    </router-link>
    <div class="sidebar">
      <div>
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
          <div class="image">
            <img
              :src="`${this.$AppHelper.apiEndpoint()}${thisBiodata.profile_img}`"
              class="img-circle elevation-2"
              alt="Profile Image"
            />
          </div>
          <div class="info">
            <router-link
              :to="{ name: 'Profile' }"
              class="d-block"
            >{{thisBiodata.name}}</router-link>
          </div>
        </div>
        <AllowLink />
      </div>
      <nav class="mt-2">
        <ul
          class="nav nav-pills nav-sidebar flex-column"
          id="sidebar-categories"
          data-widget="treeview"
          role="menu"
          data-accordion="false"
        ></ul>
      </nav>
    </div>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex'
import AllowLink from './Child/AllowLink.vue'
export default {
  name: 'Sidebar',
  components: {
    AllowLink
  },
  computed: {
    ...mapGetters('AuthStore', ['thisBiodata'])
  }
}
</script>
