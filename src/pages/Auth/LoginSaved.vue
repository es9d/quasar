<template>
  <div
    class="container-fluid mb-3"
    id="saved-login"
  >
    <div class="my-1">
      <div
        v-for="(user, idx) in userSavedLoginData"
        :key="idx"
      >
        <div
          class="border border-info rounded mb-3 hvr-grow-shadow"
          @click="gotoPostLogin(idx)"
        >
          <div class="user-panel d-flex mx-2 my-1">
            <div class="image">
              <img
                :src="asset_img+user.profile_img"
                class="img-circle"
                alt="Profile Image"
              />
            </div>
            <div class="info">{{user.name}}</div>
            <i
              @click.prevent.stop="deleteSavedLogin(idx)"
              class="fas fa-times-circle fa-lg mt-2 mr-2 ml-auto delete-login"
            ></i>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="offset-0 offset-sm-7 col-12 col-sm-5">
          <button
            type="submit"
            class="btn btn-outline-danger btn-block text-bold"
            @click="deleteSavedLogins"
          >
            <i class="fas fa-trash fa-sm"></i>&ensp;Delete All
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'LoginSaved',
  created () {
    this.getSavedLogins()
  },
  methods: {
    getSavedLogins () {
      this.userSavedLoginData = this.$SavedLogin.loginTake()
    },
    gotoPostLogin (idx) {
      Swal.fire({
        title: `Login using ${this.userSavedLoginData[idx].name}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!',
        cancelButtonText: 'No!'
      }).then(async (result) => {
        if (result.value) {
          this.$parent.thisEmail = this.userSavedLoginData[idx].username
          this.$parent.thisPassword = this.userSavedLoginData[idx].password
          await this.$parent.postLogin(this.userSavedLoginData[idx].username, this.userSavedLoginData[idx].password)
        }
      })
    },
    deleteSavedLogin (idx) {
      Swal.fire({
        title: `Delete login from ${this.userSavedLoginData[idx].name}?`,
        text: 'You need to login manual after delete',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete!',
        cancelButtonText: 'Cancel!'
      }).then(async (result) => {
        if (result.value) {
          await this.$SavedLogin.loginRemove(idx)
          this.getSavedLogins()
        }
      })
    },
    deleteSavedLogins () {
      Swal.fire({
        title: 'Delete all saved logins?',
        text: 'You will lost all your saved login',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete All!',
        cancelButtonText: 'Calcel!'
      }).then(async (result) => {
        if (result.value) {
          await this.$SavedLogin.loginRemove('all')
          Swal.fire('Success', 'All login saved has been deleted', 'success')
          this.getSavedLogins()
          this.$parent.haveLoginSaved = false
        }
      })
    }
  },
  data () {
    return {
      asset_img: this.$AppHelper.apiEndpoint(),
      userSavedLoginData: []
    }
  }
}
</script>

<style lang="css" scoped>
.hvr-grow-shadow {
  /* display: inline-block; */
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  -webkit-transition-duration: 0.5s;
  transition-duration: 0.5s;
  -webkit-transition-property: box-shadow, transform;
  transition-property: box-shadow, transform;
}
.hvr-grow-shadow:hover,
.hvr-grow-shadow:focus,
.hvr-grow-shadow:active {
  box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
  background-color: #57abb8;
  color: #ffffff;
  -webkit-transition-duration: 0.5s;
  transition-duration: 0.5s;
  transition: background-color 1s ease-out;
  -moz-transition: background-color 1s ease-out;
  -webkit-transition: background-color 1s ease-out;
  -o-transition: background-color 1s ease-out;
}
/* ref: http://ianlunn.github.io/Hover/ */

.delete-login:hover {
  color: red;
  transition: color 0.5s ease-out;
  -moz-transition: color 0.5s ease-out;
  -webkit-transition: color 0.5s ease-out;
  -o-transition: color 0.5s ease-out;
}
</style>
