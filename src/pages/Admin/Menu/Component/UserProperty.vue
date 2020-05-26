<template>
  <div id="user-property">
    <div class="card card-primary card-outline">
      <div class="card-body box-profile">
        <div class="text-center">
          <img
            class="profile-user-img img-fluid img-circle"
            :src="`${this.$AppHelper.apiEndpoint()}${userProps.profile_img}`"
            alt="user-profile-image"
          />
        </div>
        <h3 class="profile-username text-center">{{ userProps.name }}</h3>
        <p class="text-muted text-bold text-center">{{ userProps.status }}</p>
        <ul class="list-group list-group-unbordered mb-3">
          <li class="list-group-item">
            <i class="fas fa-at"></i>
            <a class="float-right">{{ userProps.email }}</a>
          </li>
          <li
            class="list-group-item"
            v-html="userActiveConvert(userProps.active)"
          />
          <li class="list-group-item">
            <i class="fas fa-user-plus"></i>
            <a class="float-right">{{ userProps.registered }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserProperty',
  props: {
    userProps: null
  },
  methods: {
    userActiveConvert (status) {
      if (status === 'Suspend') {
        return `<font class="text-bold text-warning"><i class="fas fa-exclamation-circle"></i><a class="float-right">${status}</a></font>`
      } else if (status === 'Block') {
        return `<font class="text-bold text-danger"><i class="far fa-times-circle"></i><a class="float-right">${status}</a></font>`
      } else {
        return `<font class="text-bold text-success"><i class="far fa-check-circle"></i><a class="float-right">${status}</a></font>`
      }
    }
  }
}
</script>
