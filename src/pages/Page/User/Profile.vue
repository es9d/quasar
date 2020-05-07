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
              <HistoryLogins />
            </div>
            <div
              class="tab-pane"
              id="biodata"
            >
              <ManagementBiodata />
            </div>
            <div
              class="tab-pane"
              id="password"
            >
              <ManagementPassword />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Profile',
  components: {
    HistoryLogins: () => import('src/components/App/Profile/History/HistoryLogins'),
    ManagementBiodata: () => import('src/components/App/Profile/Management/ManagementBiodata'),
    ManagementPassword: () => import('src/components/App/Profile/Management/ManagementPassword')
  },
  computed: {
    ...mapGetters('AuthStore', ['thisBiodata'])
  }
}
</script>
