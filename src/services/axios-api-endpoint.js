import axios from 'axios'
import AppHelper from 'src/third-party/helper/app-helper.min'
import AxiosResponse from 'src/third-party/helper/axios-response.min'
import CredMng from 'src/third-party/auth/credential-manager.min'
import LocSer from 'src/third-party/library/locutus-serialize.min'
import Notify from 'src/third-party/helper/app-notify.min'

axios.defaults.withCredentials = true
axios.defaults.baseURL = AppHelper.apiEndpoint()
axios.defaults.headers = { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' }
axios.defaults.timeout = 10000

const RestServices = {
  getCookies: () => axios.get('/sanctum/csrf-cookie').catch(err => axiosResErrorNotify(err, 'error')),
  getCredential: () => axios.get('/api/auth/creds', CredMng.axiosHeaderToken()),
  getUserProfile: () => axios.get('/api/user/profile', CredMng.axiosHeaderToken()),
  getUserLoginHistory: (_loghistory) => axios.get(`/api/user/history/login?_loghistory=${_loghistory}`, CredMng.axiosHeaderToken()).catch(err => axiosResErrorNotify(err, '')),
  getUserLoginHistoryByCode: (_logdetailuser) => axios.get(`/api/user/history/login?_logdetailuser=${_logdetailuser}`, CredMng.axiosHeaderToken()).catch(err => axiosResErrorNotify(err, '')),
  getUserProfileImageHistoryList: () => axios.get('/api/user/profile/image/history', CredMng.axiosHeaderToken()).catch(err => axiosResErrorNotify(err, 'error')),
  postLogin: (email, password, devData) => axios.post('/api/auth/login', { email, password, device: devData.device, devdata: LocSer.serialize(devData.data) }).catch(err => axiosResErrorNotify(err, 'info')),
  postLogout: () => axios.post('/api/auth/logout', {}, CredMng.axiosHeaderToken()).catch(err => axiosResErrorNotify(err, '')),
  postLogoutRevokes: () => axios.post('/api/auth/logout', { _action: 'revoke' }, CredMng.axiosHeaderToken()).catch(err => axiosResErrorNotify(err, '')),
  postRegister: (name, email, password) => axios.post('/api/auth/register', { name, email, password }).catch(err => axiosResErrorNotify(err, 'info')),
  postVerifyRegister: (_access) => axios.post('/api/access/register/verify', { _access }).catch(err => axiosResErrorNotify(err, 'info')),
  postLostPassword: (email) => axios.post('/api/auth/lost-password', { email }).catch(err => axiosResErrorNotify(err, 'info')),
  postLostPasswordAccess: (_access) => axios.post('/api/auth/lost-password/access', { _access }).catch(err => axiosResErrorNotify(err, 'info')),
  postRecoverPassword: (password, _access) => axios.post('/api/auth/lost-password/recover', { password, _access }).catch(err => axiosResErrorNotify(err, 'info')),
  postNewImageUserProfile: (formImage) => axios.post('/api/user/profile?_upload=image', formImage, CredMng.axiosHeaderToken()).catch(err => axiosResErrorNotify(err, 'info')),
  patchUserBiodata: (time, name, image) => axios.patch(`/api/user/profile/${time}?_update=biodata`, { name, image }, CredMng.axiosHeaderToken()).catch(err => axiosResErrorNotify(err, 'info')),
  patchUserPassword: (time, oldpass, newpass) => axios.patch(`/api/user/profile/${time}?_update=password`, { old_pass: oldpass, new_pass: newpass }, CredMng.axiosHeaderToken()).catch(err => axiosResErrorNotify(err, 'info')),
  deleteUserProfileImageHistory: (time, imgCode) => axios.delete(`/api/user/profile/image/history/${time}?_histImgCode=${imgCode}`, CredMng.axiosHeaderToken()).catch(err => axiosResErrorNotify(err, 'error')),
  // ! admin maintenance
  getResAdminMenuIndex: (request = 'countOnly') => axios.get(`/api/admin/menu?_users=${request}&_newMembers=${request}&_unlistedUsers=${request}&_lostPasswords=${request}`, CredMng.axiosHeaderToken()).catch(err => axiosResErrorNotify(err, 'error')),
  getResAdminMenuUsersList: () => axios.get('/api/admin/menu?_users=full', CredMng.axiosHeaderToken()).catch(err => axiosResErrorNotify(err, 'error')),
  getResAdminMenuUnlistedUsersList: () => axios.get('/api/admin/menu?_unlistedUsers=full', CredMng.axiosHeaderToken()).catch(err => axiosResErrorNotify(err, 'error')),
  getResAdminMenuNewMembersList: () => axios.get('/api/admin/menu?_newMembers=full', CredMng.axiosHeaderToken()).catch(err => axiosResErrorNotify(err, 'error')),
  getResAdminMenuLostPasswordList: () => axios.get('/api/admin/menu?_lostPasswords=full', CredMng.axiosHeaderToken()).catch(err => axiosResErrorNotify(err, 'error')),
  getResAdminMenuUserDetail: (userCode) => axios.get(`/api/admin/menu?_user=${userCode}`, CredMng.axiosHeaderToken()).catch(err => axiosResErrorNotify(err, 'error')),
  getResAdminMenuNewMemberDetail: (userCode) => axios.get(`/api/admin/menu?_newMember=${userCode}`, CredMng.axiosHeaderToken()).catch(err => axiosResErrorNotify(err, 'error')),
  getResAdminMenuLostPasswordDetail: (userCode) => axios.get(`/api/admin/menu?_lostPassword=${userCode}`, CredMng.axiosHeaderToken()).catch(err => axiosResErrorNotify(err, 'error')),
  getResAdminMenuSearchUserByName: (name, condition = '') => axios.get(`/api/admin/menu?_searchName=${name}${condition ? `&_condition=${condition}` : ''}`, CredMng.axiosHeaderToken()).catch(err => axiosResErrorNotify(err, 'error')),
  getResAdminMenuDynamicUrl: (url) => axios.get(url, CredMng.axiosHeaderToken()).catch(err => axiosResErrorNotify(err, 'error')),
  getResAdminMenuMailPreview: (goto, accessCode) => axios.get(`/api/admin/${goto}/${accessCode}/preview`, CredMng.axiosHeaderToken()).catch(err => axiosResErrorNotify(err, 'error')),
  patchAdminMenuSetNewUserActiveStatus: (time, userCode, newActStat) => axios.patch(`/api/admin/menu/${time}`, { _userSetStatus: userCode, _setNewActiveStatus: newActStat }, CredMng.axiosHeaderToken()).catch(err => axiosResErrorNotify(err, 'error')),
  patchAdminMenuUserRestore: (time, userCode) => axios.patch(`/api/admin/menu/${time}`, { _userRestore: userCode }, CredMng.axiosHeaderToken()).catch(err => axiosResErrorNotify(err, 'error')),
  deleteAdminMenuUserDelete: (time, userCode, delMeth = 'default') => axios.delete(`/api/admin/menu/${time}?_userDelete=${userCode}&_method=${delMeth}`, CredMng.axiosHeaderToken()).catch(err => axiosResErrorNotify(err, 'error')),
  deleteAdminMenuLostPasswordRequest: (time, accessCode) => axios.delete(`/api/admin/menu/${time}?_lostPasswdRequest=${accessCode}`, CredMng.axiosHeaderToken()).catch(err => axiosResErrorNotify(err, 'error')),
  deleteAdminUserProfileImageHistory: (time, imgCode) => axios.delete(`/api/user/profile/image/history/${time}?_histImgCode=${imgCode}&_method=force`, CredMng.axiosHeaderToken()).catch(err => axiosResErrorNotify(err, 'error'))
}

const axiosResErrorNotify = (err, type) => Notify.notifyResponse(type, AxiosResponse.catchError(err))

export default RestServices
