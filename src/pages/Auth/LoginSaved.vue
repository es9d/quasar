<template>
  <div class="container mb-3">
    <div class="my-1">
      <div
        v-for="(user, idx) in userSavedLoginData"
        :key="idx"
      >
        <div
          class="border border-info rounded mb-2 hvr-grow-shadow"
          @click="setPostLogin(idx)"
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
          </div>
        </div>
      </div>
      <button class="btn btn-sm btn-link text-danger float-right"><i class="fas fa-trash fa-sm"></i>&ensp;delete all</button>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'LoginSaved',
  methods: {
    setPostLogin (idx) {
      // alert(`Login menggunakan akun ${this.userSavedLoginData[idx].name}?`)
      Swal.fire({
        title: `Login using ${this.userSavedLoginData[idx].name}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!',
        cancelButtonText: 'No!'
      }).then((result) => {
        if (result.value) {
          this.$parent.postLogin(this.userSavedLoginData[idx].username, this.userSavedLoginData[idx].password)
        }
      })
    }
  },
  data () {
    return {
      asset_img: this.$AppHelper.apiEndpoint(),
      userSavedLoginData: [
        { name: 'Bachtiar', profile_img: '/files/image/profile/default.jpg', username: 'bachtiar@mail.com', password: 'bachtiar' },
        { name: 'Cashier', profile_img: '/files/image/profile/default.jpg', username: 'cashier@mail.com', password: 'cashier' }
      ]
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
  background-color: #57abb8;
  color: #ffffff;
  transition: background-color 1s ease-out;
  -moz-transition: background-color 1s ease-out;
  -webkit-transition: background-color 1s ease-out;
  -o-transition: background-color 1s ease-out;
}
/* ref: http://ianlunn.github.io/Hover/ */
</style>
