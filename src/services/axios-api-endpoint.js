import axios from 'axios'
import AppHelper from 'src/third-party/helper/app-helper.min'
import CredMng from 'src/third-party/auth/credential-manager.min'
import LocSer from 'src/third-party/library/locutus-serialize.min'

axios.defaults.withCredentials = true
axios.defaults.baseURL = AppHelper.apiEndpoint()
axios.defaults.headers = { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' }

const RestServices = {
  getCookies: () => axios.get('/sanctum/csrf-cookie'),
  getCredential: () => axios.get('/api/auth/creds', CredMng.axiosHeaderToken()),
  getUserProfile: () => axios.get('/api/user/profile', CredMng.axiosHeaderToken()),
  getUserLoginHistory: (_loghistory) => axios.get('/api/user/history/login', { _loghistory }, CredMng.axiosHeaderToken()),
  postLogin: (email, password, devData) => axios.post('/api/auth/login', { email, password, device: devData.device, uadata: LocSer.serialize(devData.data) }),
  postLogout: () => axios.post('/api/auth/logout', {}, CredMng.axiosHeaderToken()),
  postRegister: (name, email, password) => axios.post('/api/auth/register', { name, email, password }),
  postVerifyRegister: (_access) => axios.post('/api/access/register/verify', { _access }),
  postLostPassword: (email) => axios.post('/api/auth/lost-password', { email }),
  postLostPasswordAccess: (_access) => axios.post('/api/auth/lost-password/access', { _access }),
  postRecoverPassword: (password, _access) => axios.post('/api/auth/lost-password/recover', { password, _access }),
  postNewImageUserProfile: (formImage) => axios.post('/api/user/profile?_upload=image', formImage, CredMng.axiosHeaderToken()),
  patchUserBiodata: (time, name, image) => axios.patch('/api/user/profile/' + time + '?_update=biodata', { name, image }, CredMng.axiosHeaderToken()),
  patchUserPassword: (time, oldpass, newpass) => axios.patch('/api/user/profile/' + time + '?_update=password', { old_pass: oldpass, new_pass: newpass }, CredMng.axiosHeaderToken())
}

export default RestServices
