<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script >
export default {
  name: 'App',
  metaInfo () {
    return {
      title: this.$route.meta.title,
      titleTemplate: `%s :: ${this.$AppHelper.appName()}`,
      htmlAttrs: {
        lang: 'en',
        amp: true
      }
    }
  }
}
</script>
