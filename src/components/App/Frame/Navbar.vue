<template>
  <nav class="main-header navbar navbar-expand navbar-dark navbar-gray-dark">
    <ul class="navbar-nav">
      <li class="nav-item">
        <button
          class="btn btn-link nav-link pushMenu"
          data-comm="deldflag"
          data-widget="pushmenu"
          v-on:click="sidebarFlag"
          v-on:blur="sidebarFlagBlur"
        >
          <i class="fas fa-bars"></i>
        </button>
      </li>
    </ul>
    <ul class="navbar-nav ml-auto">
      <li class="nav-item"></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    sidebarFlag () {
      const comm = this.$('.pushMenu').attr('data-comm')
      if (comm === 'deldflag') {
        this.$('.pushMenu').attr('data-comm', 'adddflag')
        if (window.screen.width < 500) {
          this.$('.sidebar-mini').removeClass('sidebar-collapse')
          this.$('.sidebar-mini').addClass('sidebar-open')
        } else {
          this.$('.sidebar-mini').addClass('sidebar-collapse')
        }
      } else {
        this.$('.pushMenu').attr('data-comm', 'deldflag')
        if (window.screen.width < 500) {
          this.$('.sidebar-mini').removeClass('sidebar-open')
          this.$('.sidebar-mini').addClass('sidebar-collapse')
        } else {
          this.$('.sidebar-mini').removeClass('sidebar-collapse')
        }
      }
    },
    sidebarFlagBlur () {
      const comm = this.$('.pushMenu').attr('data-comm')
      if (comm === 'deldflag') {
        if (window.screen.width < 500) {
          this.$('.pushMenu').attr('data-comm', 'adddflag')
          this.$('.sidebar-mini').removeClass('sidebar-collapse')
          this.$('.sidebar-mini').addClass('sidebar-open')
        }
      } else {
        if (window.screen.width < 500) {
          this.$('.pushMenu').attr('data-comm', 'deldflag')
          this.$('.sidebar-mini').removeClass('sidebar-open')
          this.$('.sidebar-mini').addClass('sidebar-collapse')
        }
      }
    }
  }
}
</script>
