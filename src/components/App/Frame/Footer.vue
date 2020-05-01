<template>
  <footer class="main-footer">
    <router-link
      :to="{ name:'About' }"
      class="float-right d-none d-sm-inline link"
    >
      <i class="far fa-copyright"></i> Bachtiars Project
    </router-link>
    <strong>{{ app_name }}</strong>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    app_name: String
  }
}
</script>

<style scoped>
.link {
  color: #86909a;
  text-decoration: none;
  background-color: none;
}
</style>
