<template>
  <div
    class="user-panel mt-2 pb-2 mb-2"
    id="sidebarLink"
  >
    <ul
      class="nav nav-pills nav-sidebar flex-column"
      data-widget="treeview"
      role="menu"
      data-accordion="false"
    >
      <li
        class="nav-item"
        v-for="{index, name, icon, link} in sidebarLink"
        :key="index"
      >
        <router-link
          :to="{ name: link }"
          :class="`nav-link linkUrl ${(link == getPath()) ? `active` : ``}`"
          :id="`linkID-${index}`"
          @click.native="activeLi(index)"
        >
          <i :class="icon"></i>&ensp;
          <p class="text-sm">{{ name }}</p>
        </router-link>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="app-signout"
          @click="appSignout"
        >
          <i class="fas fa-sign-out-alt"></i>&ensp;
          <p class="text-sm">Sign Out</p>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Swal from 'sweetalert2'
export default {
  name: 'AllowLink',
  computed: {
    ...mapGetters('AuthStore', ['sidebarLink'])
  },
  methods: {
    getPath () {
      return this.$route.name
    },
    activeLi: function (index) {
      this.$('.linkUrl').removeClass('active')
      this.$(`#linkID-${index}`).addClass('active')
    },
    appSignout () {
      Swal.fire({
        title: 'Are you sure ?',
        text: 'It will close session from this app',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, im Sure!',
        cancelButtonText: 'Cancel'
      }).then(async result => {
        if (result.value) {
          await this.$axios
            .postLogout()
            .then(async res => {
              if (res.data.status === 'success') {
                await this.$CredMng.credentialKeyRemove()
                this.$Notify.notifySuccess(res.data.message)
                return this.$router.push({ name: 'Login' })
              } else {
                this.$Notify.notifyError(res.data.message)
              }
            })
            .catch(error => {
              this.$Notify.notifyError(error.message)
            })
        }
      })
    }
  }
}
</script>
