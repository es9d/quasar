<template>
  <div id="mail-preview">
    <p class="text-bold text-center">--- Mail Preview ---</p>
    <h6 class="text-muted text-sm mx-3">
      Access Code : <code>{{this.$parent.userRequest.access}}</code>.
    </h6>
    <button
      :class="`btn btn-outline-${mailOpenStatus?'warning':'info'} text-bold mx-3 mt-2`"
      @click="openMailPage"
    ><i :class="`fas fa-envelope${mailOpenStatus?'':'-open'}`"></i>&ensp;{{mailOpenStatus?'Close':'Open'}} Mail</button>
    <div
      class="embed-responsive embed-responsive-16by9 rounded mt-3"
      id="mail-page-preview"
      style="display:none;"
    >
      <iframe
        class="embed-responsive-item"
        id="iframe-mail-page"
        style="overflow:hidden;"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MailPreview',
  props: {
    openMail: null,
    accessCode: null
  },
  methods: {
    getRequest () {
      var url = ''
      if (this.openMail === 'lostpassword') url = 'lost-password'
      if (this.openMail === 'newregister') url = 'new-register'
      return url
    },
    getMailPage () {
      this.$axios.getCookies().then(() => {
        this.$axios.getResAdminMenuMailPreview(this.getRequest(), this.accessCode).then(async res => {
          this.$('#iframe-mail-page').attr('srcdoc', res.data)
        })
      })
    },
    openMailPage () {
      if (!this.mailOpenStatus) {
        this.mailOpenStatus = true
        this.getMailPage()
        this.$('#mail-page-preview').show(500)
      } else {
        this.mailOpenStatus = false
        this.$('#mail-page-preview').hide(500)
      }
    }
  },
  data () {
    return {
      mailOpenStatus: false
    }
  }
}
</script>
