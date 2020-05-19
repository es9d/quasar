<template>
  <div class="hold-transition login-page bg-gradient-dark">
    <div class="login-logo text-white">{{ this.$AppHelper.appName() }}</div>
    <div class="container">
      <div class="card">
        <div class="card-body mt-3 mb-5">
          <div class="h4 text-center text-secondary mb-3">About Project</div>
          <div class="mx-1 mx-sm-5 mb-3 text-secondary">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam laboriosam architecto provident repudiandae, possimus facere nobis, voluptatibus, ratione dignissimos ducimus voluptate. Repellat accusamus eaque commodi ipsum illo dolorem a voluptate?</div>
          <div class="mx-1 mx-sm-5 text-secondary">
            <router-link
              v-if="this.isAuthorized"
              class="btn btn-secondary"
              style="width:200px;"
              :to="{name: 'Home'}"
            >Return to Home</router-link>
            <router-link
              v-else
              class="btn btn-secondary"
              style="width:200px;"
              :to="{name: 'Login'}"
            >Go to Login</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  created () {
    this.isAuthorized = Boolean(this.$CredMng.credentialKeyTake())
  },
  data () {
    return {
      isAuthorized: false
    }
  }
}
</script>
