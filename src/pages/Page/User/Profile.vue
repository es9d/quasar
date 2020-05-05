<template>
  <div class="row">
    <div class="col-md-4">
      <div class="card card-primary card-outline">
        <div class="card-body box-profile">
          <div class="text-center">
            <img
              class="profile-user-img img-fluid img-circle"
              :src="`${this.$AppHelper.apiEndpoint()}${thisBiodata.profile_img}`"
              alt="user-profile-image"
            />
          </div>
          <h3 class="profile-username text-center">{{ thisBiodata.name }}</h3>
          <p class="text-muted text-bold text-center">{{ thisBiodata.status }}</p>
          <ul class="list-group list-group-unbordered mb-3">
            <li class="list-group-item">
              <i class="fas fa-at"></i>
              <a class="float-right">{{ thisBiodata.email }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="col-md-8">
      <div class="card">
        <div class="card-header p-2">
          <ul class="nav nav-pills">
            <li class="nav-item">
              <a
                class="nav-link text-bold active"
                href="#history"
                data-toggle="tab"
              >History</a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link text-bold"
                href="#biodata"
                data-toggle="tab"
              >Biodata</a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link text-bold"
                href="#password"
                data-toggle="tab"
              >Password</a>
            </li>
          </ul>
        </div>
        <div class="card-body">
          <div class="tab-content">
            <div
              class="tab-pane active"
              id="history"
            >
              <p class="text-bold text-center">--- Login History ---</p>
              <HistoryLogins />
            </div>
            <div
              class="tab-pane"
              id="biodata"
            >
              <p class="text-bold text-center">--- Biodata Management ---</p>
              <div class="form-group">
                <label for="setting-biodata-name">Full Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="setting-biodata-name"
                  v-model="fullNameBiodata"
                />
              </div>
              <div class="form-group">
                <form
                  id="setting-biodata-image"
                  enctype="multipart/form-data"
                  @submit.prevent="uploadImageProfile"
                >
                  <label for="setting-biodata-image-import">Image Profile</label>
                  <div class="custom-file">
                    <input
                      type="file"
                      class="custom-file-input"
                      name="_image"
                      id="setting-biodata-image-import"
                      accept="image/x-png, image/jpeg"
                      @change="autoUploadImageOnChange"
                    />
                    <label
                      class="custom-file-label"
                      for="setting-biodata-image-import"
                    >{{imageUploadOrigin}}</label>
                  </div>
                  <input
                    type="text"
                    id="setting-biodata-image-src"
                    v-model="imageUploadForm"
                    hidden
                    readonly
                  />
                  <input
                    type="submit"
                    class="btn btn-primary"
                    id="setting-biodata-image-submit"
                    style="display: none;"
                  />
                </form>
                <p
                  class="text-muted mt-1"
                  style="font-size: 12px"
                >Image rule: photo dimensions 4x4, format [jpg, jpeg, png], max size 2 MB.</p>
                <img
                  v-if="this.imageUploadResult"
                  class="profile-user-img img-fluid img-circle"
                  :src="`${this.$AppHelper.apiEndpoint()}${this.imageUploadResult}`"
                  alt="user-profile-image"
                />
              </div>
              <button
                class="btn btn-primary float-right text-bold"
                @click="biodataUpdatePost"
              >
                <i class="fas fa-user-alt"></i>&ensp;Update Biodata
              </button>
            </div>
            <div
              class="tab-pane"
              id="password"
            >
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
                <div
                  class="messagePassword mt-1"
                  :v-if="profileUpdatePasswordMsg.length"
                >
                  <h6
                    v-for="(msg, idx) in profileUpdatePasswordMsg"
                    :key="idx"
                  >{{msg}}</h6>
                </div>
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Swal from 'sweetalert2'
import AwSleep from 'src/third-party/helper/await-sleep.min'
import RegexValidation from 'src/third-party/helper/regex-validation.min'
import ForgeJs from 'src/third-party/library/forgejs.min.js'
import PassGenJs from 'src/third-party/library/passgenjs.min'
import Toastr from 'src/third-party/library/toastrjs.min'
export default {
  name: 'Profile',
  components: {
    HistoryLogins: () => import('src/components/App/Media/HistoryLogins')
  },
  computed: {
    ...mapGetters('AuthStore', ['thisBiodata'])
  },
  methods: {
    ...mapActions('AuthStore', ['getBiodata']),
    autoUploadImageOnChange () {
      this.$('#setting-biodata-image-submit').click()
    },
    uploadImageProfile () {
      this.$axios.getCookies().then(() => {
        const formImage = new FormData(
          document.getElementById('setting-biodata-image')
        )
        this.$axios
          .postNewImageUserProfile(formImage)
          .then(res => {
            if (res.data.status === 'success') {
              this.imageUploadOrigin = res.data.response_data[0].origin_name
              this.imageUploadForm = res.data.response_data[0].img_name
              this.imageUploadResult = res.data.response_data[0].img_name
            } else {
              this.imageUploadOrigin = ''
              this.imageUploadForm = ''
              this.imageUploadResult = ''
              Toastr.toastError(`${res.data.message._image[0]}`)
            }
          })
          .catch(err => this.catchError('toast', err))
      })
    },
    biodataUpdatePost () {
      Swal.fire({
        title: 'Update your biodata?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancel!',
        confirmButtonText: 'Yes, Update Now!'
      }).then(async result => {
        if (result.value) {
          if (this.fullNameBiodata) {
            this.$axios.getCookies().then(() => {
              this.$axios
                .patchUserBiodata(
                  this.appTimeNow,
                  this.fullNameBiodata,
                  this.imageUploadForm
                )
                .then(async res => {
                  if (res.data.status === 'success') {
                    await Swal.fire(
                      'Success',
                      `${res.data.message}`,
                      'success'
                    )
                    this.imageUploadOrigin = ''
                    this.imageUploadForm = ''
                    this.imageUploadResult = ''
                    this.getBiodata()
                  } else {
                    await Swal.fire(
                      'Opps!!',
                      `${this.responseFailed(res.data.message)}`,
                      'warning'
                    )
                  }
                })
                .catch(err => this.catchError('swal', err))
            })
          }
          if (!this.fullNameBiodata) {
            Swal.fire('Waitt!!', 'You cannot leave your name blank', 'warning')
          }
        }
      })
    },
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
    async formFieldPassword () {
      await AwSleep.sleep(1000)
      const validate = RegexValidation.passRegex(this.profileNewPassword)
      this.$('#password-generate-button').show()
      this.passwordWatch()
      this.$('.messagePassword').css(
        'color',
        `${validate.status === 'success' ? '#119822' : '#C91E1E'}`
      )
      this.profileUpdatePasswordBool = validate.result
      this.profileUpdatePasswordMsg = validate.message
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
    generatePassword () {
      this.profileNewPassword = PassGenJs.newGenPass()
      this.$('#newpassword').removeClass()
      this.$('#setting-password-new').attr('type', 'text')
      this.$('#newpassword').addClass('fas fa-eye-slash')
    },
    setFieldMessage (goto, status, message) {
      this.$(`${goto}`).css(
        'color',
        `${status === 'success' ? '#119822' : '#C91E1E'}`
      )
      this.$(`${goto}`).html(message)
    },
    gotoNewPassword () {
      this.$('#setting-password-new').focus()
    },
    catchError (alertType, err) {
      alertType === 'swal'
        ? Swal.fire('Sorry', 'Opps!, something went wrong', 'error')
        : Toastr.toastError('Opps!, something went wrong')
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
      fullNameBiodata: this.$store.state.AuthStore.thisBiodata.name,
      imageUploadOrigin: '',
      imageUploadForm: '',
      imageUploadResult: '',
      profileOldPassword: '',
      profileNewPassword: '',
      profileUpdatePasswordBool: false,
      profileUpdatePasswordMsg: []
    }
  }
}
</script>
