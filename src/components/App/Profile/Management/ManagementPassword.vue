<template>
  <div id="password-management">
    <p class="text-bold text-center">--- Password Management ---</p>
    <div class="form-group">
      <div class="input-group">
        <input
          type="password"
          class="form-control"
          id="setting-password-current"
          placeholder="Current Password"
          @keyup.enter="gotoNewPassword"
          v-model="profileOldPassword"
        />
        <div class="input-group-append">
          <div
            class="input-group-text"
            v-on:click="passwordWatch('#oldpassword', '#setting-password-current')"
          >
            <span
              class="fas fa-eye"
              id="oldpassword"
            ></span>
          </div>
        </div>
      </div>
      <div class="input-group mt-3">
        <input
          type="password"
          class="form-control"
          id="setting-password-new"
          placeholder="New Password"
          @keyup="formFieldPassword"
          v-model="profileNewPassword"
        />
        <div class="input-group-append">
          <div
            class="input-group-text"
            v-on:click="passwordWatch('#newpassword', '#setting-password-new')"
          >
            <span
              class="fas fa-eye"
              id="newpassword"
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
    </div>
    <button
      class="btn btn-primary float-right text-bold"
      @click="profileUpdatePassword"
    >
      <i class="fas fa-key"></i>&ensp;Update Password
    </button>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import ForgeJs from 'src/third-party/library/forgejs.min.js'
import PassGenJs from 'src/third-party/library/passgenjs.min'
import RegexValidation from 'src/third-party/helper/regex-validation.min'
export default {
  name: 'ManagementPassword',
  methods: {
    profileUpdatePassword () {
      Swal.fire({
        title: 'Update your password?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancel!',
        confirmButtonText: 'Yes, Update Now!'
      }).then(async res => {
        if (res.value) {
          if (this.profileOldPassword.length > 0) {
            if (this.profileUpdatePasswordBool) {
              await this.$axios.getCookies().then(async () => {
                await this.$axios
                  .patchUserPassword(
                    this.appTimeNow,
                    ForgeJs.encryptPassword(this.profileOldPassword),
                    ForgeJs.encryptPassword(this.profileNewPassword)
                  )
                  .then(async res => {
                    if (res.data.status === 'success') {
                      await Swal.fire(
                        'Success',
                        `${res.data.message}`,
                        'success'
                      )
                    } else {
                      await Swal.fire(
                        'Opps!!',
                        `${this.responseFailed(res.data.message)}`,
                        'error'
                      )
                    }
                  })
                  .catch(err => this.catchError('swal', err))
              })
            } else {
              Swal.fire(
                'Waitt!',
                'Your new password format are not correct yet.',
                'warning'
              )
            }
          } else {
            Swal.fire(
              'Waitt!',
              'Your must enter your current password.',
              'warning'
            )
          }
        }
      })
    },
    async formFieldPassword () {
      this.passwordWatch()
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        const validate = RegexValidation.passRegex(this.profileNewPassword)
        this.$('#password-generate-button').show()
        this.setFieldMessage('.messagePassword', validate.status, validate.message)
        this.profileUpdatePasswordBool = validate.result
      }, 1000)
    },
    generatePassword () {
      this.profileNewPassword = PassGenJs.newGenPass()
      this.$('#newpassword').removeClass()
      this.$('#setting-password-new').attr('type', 'text')
      this.$('#newpassword').addClass('fas fa-eye-slash')
    },
    gotoNewPassword () {
      this.$('#setting-password-new').focus()
    },
    passwordWatch (toggle, inputform) {
      const inputtype = this.$(`${inputform}`).attr('type')
      this.$(`${toggle}`).removeClass()
      if (inputtype === 'password') {
        this.$(`${inputform}`).attr('type', 'text')
        this.$(`${toggle}`).addClass('fas fa-eye-slash')
      } else {
        this.$(`${inputform}`).attr('type', 'password')
        this.$(`${toggle}`).addClass('fas fa-eye')
      }
    },
    setFieldMessage (goto, status, message) {
      this.$(`${goto}`).css(
        'color',
        `${status === 'success' ? '#119822' : '#C91E1E'}`
      )
      this.$(`${goto}`).html(message)
    },
    responseFailed (data) {
      var errorMsg = ''
      if (data.name) {
        data.name.forEach(msg => {
          errorMsg += errorMsg ? `, ${msg}` : msg
        })
      }
      if (data.old_pass) {
        data.old_pass.forEach(msg => {
          errorMsg += errorMsg ? `, ${msg}` : msg
        })
      }
      if (data.new_pass) {
        data.new_pass.forEach(msg => {
          errorMsg += errorMsg ? `, ${msg}` : msg
        })
      }
      if (errorMsg) return errorMsg
      else return data
    },
    catchError (alertType, err) {
      alertType === 'swal'
        ? Swal.fire('Sorry', 'Opps!, something went wrong', 'error')
        : this.$Notify.notifyError('Opps!, something went wrong')
      console.log(err)
    }
  },
  watch: {
    profileNewPassword () {
      this.formFieldPassword()
    }
  },
  data () {
    return {
      appTimeNow: new Date().getTime(),
      profileOldPassword: '',
      profileNewPassword: '',
      profileUpdatePasswordBool: false,
      timeout: null
    }
  }
}
</script>
