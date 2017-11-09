// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import swal from 'sweetalert2'
import store from './vuex/store'
import axios from 'axios'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import('sweetalert2/dist/sweetalert2.min.css')
import('sweetalert2/dist/sweetalert2.min.js')

Vue.prototype.$swal = swal
Vue.prototype.$http = axios.create({
  // baseUrl: 'http://localhost:3000/api'
})

Vue.use(VueMaterial)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
