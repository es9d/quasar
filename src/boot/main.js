import Vue from 'vue'
import JQuery from 'jquery'
import VueMeta from 'vue-meta'

// ? Auth
import CredMng from 'src/third-party/auth/credential-manager.min'
import SavedLogin from 'src/third-party/auth/saved-login-lib.min'

// ? Helpers
import AppHelper from 'src/third-party/helper/app-helper.min'
import AppNotify from 'src/third-party/helper/app-notify.min'
import AxiosResponse from 'src/third-party/helper/axios-response.min'

// ? Library
import DeviceDetect from 'src/third-party/library/devicedetectjs.min'
import Toastr from 'src/third-party/library/toastrjs.min'

// ? Services
import RestServices from 'src/services/axios-api-endpoint'

// ? Admin LTE
import 'admin-lte/plugins/fontawesome-free/css/all.min.css'
import 'admin-lte/plugins/icheck-bootstrap/icheck-bootstrap.min.css'
import 'admin-lte/dist/css/adminlte.min.css'
import 'admin-lte/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css'
import 'admin-lte/plugins/datatables-responsive/css/responsive.bootstrap4.min.css'
import 'admin-lte/plugins/overlayScrollbars/css/OverlayScrollbars.min.css'
import 'admin-lte/plugins/jquery/jquery.min.js'
import 'admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js'
import 'admin-lte/plugins/datatables/jquery.dataTables.min.js'
import 'admin-lte/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js'
import 'admin-lte/plugins/datatables-responsive/js/dataTables.responsive.min.js'
import 'admin-lte/plugins/datatables-responsive/js/responsive.bootstrap4.min.js'
import 'admin-lte/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js'

Vue.prototype.$axios = RestServices
Vue.prototype.$axiosRes = AxiosResponse
Vue.prototype.$ = JQuery
Vue.prototype.$AppHelper = AppHelper
Vue.prototype.$CredMng = CredMng
Vue.prototype.$SavedLogin = SavedLogin
Vue.prototype.$Device = DeviceDetect
Vue.prototype.$Notify = AppNotify
Vue.prototype.$Toastr = Toastr

Vue.use(VueMeta, { refreshOnceOnNavigation: true })
