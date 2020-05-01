<template>
  <div class="login-box">
    <div class="login-logo text-white">APPS</div>
    <div class="card">
      <div class="card-body login-card-body">
        <p
          class="login-box-msg"
          id="view-login-msg"
        >Sign in to start your session</p>
        <form
          id="form-login"
          @submit.prevent="postLogin"
        >
          <div class="input-group mb-3">
            <input
              type="email"
              class="form-control theInput"
              id="input-email"
              placeholder="E-Mail"
              v-model="thisEmail"
            />
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-at"></span>
              </div>
            </div>
          </div>
          <div class="input-group mb-3">
            <input
              type="password"
              class="form-control theInput"
              id="input-password"
              placeholder="Password"
              v-model="thisPassword"
            />
            <div class="input-group-append">
              <div
                class="input-group-text"
                @click="passwordWatch(true)"
              >
                <span
                  class="fas fa-lock"
                  id="span-password"
                ></span>
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="offset-0 offset-md-7 col-12 col-md-5">
              <button
                type="submit"
                class="btn btn-primary btn-block text-bold"
                id="input-submit"
              >
                <i class="fas fa-sign-in-alt"></i>&ensp;Login
              </button>
            </div>
          </div>
        </form>
        <p class="mb-1">
          <router-link
            :to="{ name: 'ForgetPassword' }"
            class="text-center"
          >
            <i class="fas fa-user-injured"></i>&ensp;I forgot my password
          </router-link>
        </p>
        <p class="mb-0">
          <router-link
            :to="{ name: 'Register' }"
            class="text-center"
          >
            <i class="fas fa-user-plus"></i>&ensp;Register a new membership
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    postLogin () {
      alert('ok')
    },
    passwordWatch (revert) {
      const inputtype = this.$('#input-password').attr('type')
      this.$('#span-password').removeClass()
      if (inputtype === 'password') {
        revert ? this.$('#input-password').attr('type', 'text') : this.$('#input-password').attr('type', 'password')
        revert ? this.$('#span-password').addClass('fas fa-eye-slash') : this.$('#span-password').addClass('fas fa-eye')
      } else {
        revert ? this.$('#input-password').attr('type', 'password') : this.$('#input-password').attr('type', 'text')
        revert ? this.$('#span-password').addClass('fas fa-eye') : this.$('#span-password').addClass('fas fa-eye-slash')
      }
    }
  },
  watch: {
    thisPassword () {
      if (this.thisPassword.length > 0) {
        this.passwordViewAble = true
        this.passwordWatch(false)
      } else {
        this.passwordViewAble = false
        this.$('#span-password').removeClass()
        this.$('#span-password').addClass('fas fa-lock')
      }
    }
  },
  data () {
    return {
      thisEmail: '',
      thisPassword: '',
      passwordViewAble: false
    }
  }
}
</script>
