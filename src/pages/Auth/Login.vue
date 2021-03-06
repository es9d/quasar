<template>
  <div class="login-box">
    <div class="login-logo text-white">{{ this.$AppHelper.appName() }}</div>
    <div class="card">
      <div class="card-body login-card-body rounded">
        <p
          class="login-box-msg"
          id="view-login-msg"
        >Sign in to start your session</p>
        <div v-if="!haveSession">
          <div v-if="!haveLoginSaved || needLoginManual">
            <form
              id="form-login"
              @submit.prevent="submitLogin"
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
                <div class="offset-0 offset-sm-7 col-12 col-sm-5">
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
          </div>
          <div v-else>
            <LoginSaved />
          </div>
          <div v-show="haveLoginSaved">
            <div v-if="!needLoginManual">
              <p class="mb-1">
                <a
                  href=""
                  class="text-primary"
                  @click.prevent="manualLoginManipulator"
                >
                  <i class="fas fa-user-lock"></i>&ensp;I want manual login
                </a>
              </p>
            </div>
            <div v-else>
              <p class="mb-1">
                <a
                  href=""
                  class="text-primary"
                  @click.prevent="manualLoginManipulator"
                >
                  <i class="fas fa-user-shield"></i>&ensp;Open my saved login
                </a>
              </p>
            </div>
          </div>
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
  </div>
</template>

<script>
import AwSleep from 'src/third-party/helper/await-sleep.min'
import ForgeJs from 'src/third-party/library/forgejs.min'
import RegexValidation from 'src/third-party/helper/regex-validation.min'
export default {
  name: 'Login',
  components: {
    LoginSaved: () => import('pages/Auth/LoginSaved')
  },
  created () {
    if (this.$CredMng.credentialKeyTake()) {
      this.autoLogin()
    }
  },
  methods: {
    async submitLogin () {
      this.inputClear()
      if (this.thisEmail && this.thisPassword) {
        const mail = RegexValidation.mailRegex(this.thisEmail)
        if (mail.result) {
          this.$('#input-submit').prop('disabled', true)
          this.$('#view-login-msg').html(
            this.spanMessage(
              'success',
              'Login... <i class="fas fa-spinner fa-pulse"></i>'
            )
          )
          await this.postLogin(
            this.thisEmail,
            this.thisPassword
          )
        } else {
          this.$Notify.notifyInfo(mail.message)
        }
      }
      if (!this.thisEmail) {
        this.$('#input-email').attr('placeholder', 'E-Mail cannot be empty')
        this.inputInValid('#input-email')
      }
      if (!this.thisPassword) {
        this.$('#input-password').attr(
          'placeholder',
          'Password cannot be empty'
        )
        this.inputInValid('#input-password')
      }
    },
    postLogin (email, password) {
      this.$axios.getCookies().then(() => {
        this.$axios
          .postLogin(email, ForgeJs.encryptPassword(password), this.$Device('login', true))
          .then(response => this.loginResponse(response.data))
          .catch(error => this.catchError(error))
      }).catch(error => this.catchError(error))
    },
    async autoLogin () {
      this.haveSession = true
      await AwSleep.sleep(1000)
      this.$('#input-submit').prop('disabled', true)
      this.$('#view-login-msg').html(
        this.spanMessage(
          'success',
          'Auto Login... <i class="fas fa-spinner fa-pulse"></i>'
        )
      )
      await AwSleep.sleep(2000)
      await this.$axios.getCookies().then(async () => {
        await this.$axios.getCredential().then(async response => {
          this.$('#view-login-msg').html(
            this.spanMessage(
              'success',
              'Welcome Back ' + response.data.response_data.name
            )
          )
          await AwSleep.sleep(2000)
          this.$('#view-login-msg').html(
            this.spanMessage(
              'success',
              'Please waitt... <i class="fas fa-spinner fa-pulse"></i>'
            )
          )
          await AwSleep.sleep(3000)
          return this.$router.push({ name: 'Home' })
        }).catch(
          error => {
            this.$CredMng.credentialKeyRemove()
            this.catchError(error)
            this.haveSession = false
          }
        )
      }).catch(error => this.catchError(error))
    },
    async loginResponse (data) {
      await AwSleep.sleep(1000)
      if (data.status === 'success') {
        this.$CredMng.credentialKeySave(
          data.response_data.access_token,
          this.thisRemember
        )
        this.$('#view-login-msg').html(
          this.spanMessage(
            'success',
            'Welcome ' + data.response_data.account_name
          ))
        await AwSleep.sleep(1000)
        this.$('#view-login-msg').html(
          this.spanMessage(
            'success',
            'Please waitt... <i class="fas fa-spinner fa-pulse"></i>'
          )
        )
        await this.$SavedLogin.loginSave({ name: data.response_data.account_name, profile_img: data.response_data.account_img, username: this.thisEmail, password: this.thisPassword })
        await AwSleep.sleep(3000)
        return this.$router.push({ name: 'Home' })
      } else {
        let error = ''
        data.message.email
          ? data.message.email.forEach(
            msgid => (error += this.spanMessage('info', msgid))
          )
          : (error += this.spanMessage('info', data.message))
        this.$('#view-login-msg').html(error)
        this.$('#input-submit').prop('disabled', false)
      }
    },
    spanMessage (color, message) {
      return `<p class="text-bold text-${color}">${message}</p>`
    },
    inputInValid (goto) {
      this.$(goto).addClass('is-invalid')
      this.$(goto).addClass('text-danger')
    },
    inputValid (goto) {
      this.$(goto).addClass('is-valid')
      this.$(goto).addClass('text-success')
    },
    inputClear () {
      this.$('.theInput').removeClass('is-valid')
      this.$('.theInput').removeClass('is-invalid')
      this.$('.theInput').removeClass('text-success')
      this.$('.theInput').removeClass('text-danger')
    },
    passwordWatch (revert) {
      const inputtype = this.$('#input-password').attr('type')
      if (this.passwordViewAble) {
        this.$('#span-password').removeClass()
        if (inputtype === 'password') {
          revert
            ? this.$('#input-password').attr('type', 'text')
            : this.$('#input-password').attr('type', 'password')
          revert
            ? this.$('#span-password').addClass('fas fa-eye-slash')
            : this.$('#span-password').addClass('fas fa-eye')
        } else {
          revert
            ? this.$('#input-password').attr('type', 'password')
            : this.$('#input-password').attr('type', 'text')
          revert
            ? this.$('#span-password').addClass('fas fa-eye')
            : this.$('#span-password').addClass('fas fa-eye-slash')
        }
      }
    },
    manualLoginManipulator () {
      this.needLoginManual = this.needLoginManual ? !1 : !0
    },
    catchError (error) {
      this.$('#view-login-msg').html(this.spanMessage('danger', this.$axiosRes.catchError(error)))
      this.$('#input-submit').prop('disabled', false)
      console.log(error.message)
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
      passwordViewAble: false,
      haveLoginSaved: this.$SavedLogin.loginCount() || false,
      needLoginManual: false,
      haveSession: false
    }
  }
}
</script>
