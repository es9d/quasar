import Vue from 'vue'
import axios from 'axios'
import JQuery from 'jquery'
import VueMeta from 'vue-meta'

// ? Admin LTE
import 'admin-lte/plugins/fontawesome-free/css/all.min.css'
import 'admin-lte/plugins/icheck-bootstrap/icheck-bootstrap.min.css'
import 'admin-lte/dist/css/adminlte.min.css'
import 'admin-lte/plugins/overlayScrollbars/css/OverlayScrollbars.min.css'
import 'toastr/build/toastr.min.css'
import 'admin-lte/plugins/jquery/jquery.min.js'
import 'admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js'
import 'admin-lte/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js'

Vue.prototype.$axios = axios
Vue.prototype.$ = JQuery

Vue.use(VueMeta, { refreshOnceOnNavigation: true })
