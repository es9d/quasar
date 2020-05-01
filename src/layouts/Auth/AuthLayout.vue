<template>
  <div class="hold-transition login-page bg-gradient-dark">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'AuthLayout',
  metaInfo () {
    return {
      title: this.$route.meta.title,
      titleTemplate: '%s :: ' + this.appname,
      htmlAttrs: {
        lang: 'en',
        amp: true
      }
    }
  },
  data () {
    return {
      appname: 'Apps'
    }
  }
}
</script>
