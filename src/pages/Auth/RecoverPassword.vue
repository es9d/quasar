<template>
  <div class="login-box">
    <div class="login-logo text-white">{{this.$AppHelper.appName()}}</div>
    <div class="card">
      <div class="card-body login-card-body rounded">
        <p class="login-box-msg">You are only one step a way from your new password, recover your password now.</p>
        <div class="input-group">
          <input
            type="password"
            class="form-control"
            id="input-password"
            placeholder="New Password"
            @keyup="formFieldPassword"
            @keyup.enter="gotoSubmit"
            v-model="thisPassword"
          />
          <div class="input-group-append">
            <div
              class="input-group-text"
              v-on:click="passwordWatch('true')"
            >
              <span
                class="fas fa-lock"
                id="thepassword"
              ></span>
            </div>
          </div>
        </div>
        <p class="messagePassword mt-1"></p>
        <p
          class="text-muted font-italic"
          id="password-generate-button"
          style="font-size: 15px; display: none"
        >
          Confuse?, just
          <a
            href="javascript:void(0)"
            @click="generatePassword"
          >
            <u>generate password</u>
          </a>
        </p>
        <div class="row mt-3">
          <div class="col-12">
            <button
              type="submit"
              class="btn btn-primary btn-block text-bold"
              id="input-submit"
              @click="postSubmitRecover"
            >
              <i class="fas fa-key"></i>&ensp;Change password
            </button>
          </div>
        </div>
        <p class="mt-3 mb-1">
          <router-link
            :to="{ name: 'Login' }"
            class="text-center"
          >
            <i class="fas fa-sign-in-alt"></i>&ensp;Login
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import RegexValidation from 'src/third-party/helper/regex-validation.min'
import ForgeJs from 'src/third-party/library/forgejs.min.js'
import PassGenJs from 'src/third-party/library/passgenjs.min'
export default {
  name: 'RecoverPassword',
  created () {
    this.checkAccess()
  },
  methods: {
    checkAccess () {
      this.$axios.getCookies().then(() => {
        this.$axios
          .postLostPasswordAccess(this.tokenAccess)
          .then(res => {
            if (res.data.status === 'error') {
              this.$Notify.notifyError(res.data.message)
              return this.$router.push({ name: 'Login' })
            }
          })
          .catch(err => {
            this.$Notify.notifyError(err.message)
            return this.$router.push({ name: 'Login' })
          })
      })
    },
    postSubmitRecover () {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Password will be updated to a new password',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancel!',
        confirmButtonText: 'Yes, Im sure!'
      }).then(async result => {
        if (result.value) {
          if (this.boolPassword) {
            this.$('#input-submit').prop('disabled', true)
            await this.postNewPassword()
            this.$('#input-submit').prop('disabled', false)
          } else {
            Swal.fire(
              'Waitt!',
              'Your new password are not correct yet.',
              'warning'
            )
          }
        }
      })
    },
    postNewPassword () {
      this.$axios.getCookies().then(() => {
        this.$axios
          .postRecoverPassword(
            ForgeJs.encryptPassword(this.thisPassword),
            this.tokenAccess
          )
          .then(async res => {
            await Swal.fire(
              `${res.data.status === 'success' ? 'Success!' : 'Failed!'}`,
              `${res.data.message}`,
              `${res.data.status === 'success' ? 'success' : 'error'}`
            )
            return this.$router.push({ name: 'Login' })
          })
          .catch(err => {
            Swal.fire('Failed!', `${err.message}`, 'error')
            console.log(err)
          })
      })
    },
    async formFieldPassword () {
      this.passwordWatch()
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        const validate = RegexValidation.passRegex(this.thisPassword)
        this.$('#password-generate-button').show()
        this.setFieldMessage('.messagePassword', validate.status, validate.message)
        this.boolPassword = validate.result
      }, 1000)
      if (this.thisPassword.length === 0) {
        this.$('#thepassword').removeClass()
        this.$('#thepassword').addClass('fas fa-lock')
      }
    },
    passwordWatch (action = '') {
      if (this.thisPassword.length > 0) {
        this.$('#thepassword').removeClass()
        if (this.seePassword) {
          if (action) {
            this.seePassword = false
            this.$('#input-password').attr('type', 'password')
            this.$('#thepassword').addClass('fas fa-eye')
          } else {
            this.$('#thepassword').addClass('fas fa-eye-slash')
          }
        } else {
          if (action) {
            this.seePassword = true
            this.$('#input-password').attr('type', 'text')
            this.$('#thepassword').addClass('fas fa-eye-slash')
          } else {
            this.$('#thepassword').addClass('fas fa-eye')
          }
        }
      }
    },
    generatePassword () {
      this.thisPassword = PassGenJs.newGenPass()
      this.seePassword = true
      this.$('#thepassword').removeClass()
      this.$('#input-password').attr('type', 'text')
      this.$('#thepassword').addClass('fas fa-eye-slash')
    },
    setFieldMessage (goto, status, message) {
      this.$(`${goto}`).css(
        'color',
        `${status === 'success' ? '#119822' : '#C91E1E'}`
      )
      this.$(`${goto}`).html(message)
    },
    gotoSubmit () {
      this.$('#input-submit').click()
    }
  },
  watch: {
    thisPassword () {
      this.formFieldPassword()
    }
  },
  data () {
    return {
      tokenAccess: this.$route.params.access,
      thisPassword: '',
      boolPassword: false,
      timeout: null
    }
  }
}
</script>
