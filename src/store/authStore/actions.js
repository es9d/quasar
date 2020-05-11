import CredMng from 'src/third-party/auth/credential-manager.min'
import RestServices from 'src/services/axios-api-endpoint'
import Notify from 'src/third-party/helper/app-notify.min'

export default {
  async getBiodata ({ commit }) {
    await RestServices.getCookies().then(async () => {
      const response = await RestServices.getUserProfile()
        .catch(() => {
          Notify.notifyWarning('Please login first!')
          CredMng.credentialKeyRemove()
          this.$router.push({ name: 'Login' })
        })
      if (response.data.status === 'success') {
        commit('setBiodata', response.data.response_data)
      }
    })
  }
}
