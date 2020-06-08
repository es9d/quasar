<template>
  <div id="biodata-management">
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
        <label>Image Profile</label>
        <button
          :class="`btn btn-link btn-sm text-bold ${btnImgHistory().color}`"
          @click.prevent.stop="btnImgHistoryFunc"
        >{{btnImgHistory().text}} Image History</button>
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
      <div
        id="profile-image-history"
        style="display:none"
      >
        <div v-if="imageProfileHistory.length">
          <div class="row">
            <div
              class="col-12 col-sm-6 col-md-4 col-lg-3"
              v-for="(imgHist, idx) in imageProfileHistory"
              :key="idx"
            >
              <div class="hvr-grow-shadow">
                <div
                  class="card isImgChoosed"
                  :id="`imgHistoryID-${idx}`"
                >
                  <div class="card-body">
                    <img
                      class="imgHistory"
                      :srcset="`${asset_img}${imgHist.image_origin_url}`"
                      alt="History Image"
                      @click="historyImageChoosed(idx)"
                    >
                    <button class="btn btn-outline-danger btn-sm btn-block mt-1 text-bold"><i class="fas fa-trash"></i>&ensp;Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="card">
            <div class="card-body">
              <p class="text-danger text-center mx-0 my-0">You don't have image history yet.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button
      class="btn btn-primary float-right text-bold"
      @click="biodataUpdatePost"
    >
      <i class="fas fa-user-alt"></i>&ensp;Update Biodata
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Swal from 'sweetalert2'
export default {
  name: 'ManagementBiodata',
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
              this.imageUploadForm = res.data.response_data[0].img_url
              this.imageUploadResult = res.data.response_data[0].img_url
            } else {
              this.imageUploadOrigin = ''
              this.imageUploadForm = ''
              this.imageUploadResult = ''
              this.$Notify.notifyError(`${res.data.message._image[0]}`)
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
    getUserProfileImageHistoryList () {
      this.$axios.getCookies().then(async () => {
        await this.$axios.getUserProfileImageHistoryList().then(res => {
          this.imageProfileHistory = res.data.response_data
        })
      })
    },
    btnImgHistoryFunc () {
      const boolTo = this.btnImgHistory().bool
      if (boolTo) {
        this.getUserProfileImageHistoryList()
        this.$('#profile-image-history').show(500)
      } else {
        this.$('#profile-image-history').hide(500)
      }
      this.btnImgHistoryBool = boolTo
    },
    historyImageChoosed (idx) {
      const classUsed = 'border border-primary rounded'
      this.$('.isImgChoosed').removeClass(classUsed)
      this.$(`#imgHistoryID-${idx}`).addClass(classUsed)
      this.imageUploadOrigin = this.imageProfileHistory[idx].image_origin_name
      this.imageUploadForm = this.imageProfileHistory[idx].image_origin_url
    },
    // above is function, below is helper
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
    setFieldMessage (goto, status, message) {
      this.$(`${goto}`).css(
        'color',
        `${status === 'success' ? '#119822' : '#C91E1E'}`
      )
      this.$(`${goto}`).html(message)
    },
    catchError (alertType, err) {
      alertType === 'swal'
        ? Swal.fire('Sorry', this.$axiosRes.catchError(err), 'error')
        : this.$Notify.notifyError(this.$axiosRes.catchError(err))
      console.log(err)
    },
    btnImgHistory () {
      if (this.btnImgHistoryBool) {
        return { bool: false, color: 'text-danger', text: 'Close' }
      } else {
        return { bool: true, color: 'text-primary', text: 'Open' }
      }
    }
  },
  data () {
    return {
      appTimeNow: new Date().getTime(),
      asset_img: this.$AppHelper.apiEndpoint(),
      fullNameBiodata: this.$store.state.AuthStore.thisBiodata.name,
      imageUploadOrigin: '',
      imageUploadForm: '',
      imageUploadResult: '',
      btnImgHistoryBool: false,
      imageProfileHistory: []
    }
  }
}
</script>

<style lang="css" scoped>
/* Grow Shadow */
.hvr-grow-shadow {
  /* display: inline-block; */
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: box-shadow, transform;
  transition-property: box-shadow, transform;
}
.hvr-grow-shadow:hover,
.hvr-grow-shadow:focus,
.hvr-grow-shadow:active {
  box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.imgHistory {
  max-width: 100%;
  max-height: 100%;
  display: block; /* remove extra space below image */
}
/*  border border-success rounded */
</style>
