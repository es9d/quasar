import RestServices from 'src/services/axios-api-endpoint'

export async function getUserLoginHistory ({ commit }, getdate) {
  const response = await RestServices.getUserLoginHistory(getdate)
  if (response.data.status === 'success') {
    commit('setUserLoginHistory', response.data.response_data)
  }
}
