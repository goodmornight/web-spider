import Vue from 'vue'
import App from './app'
import router from '@router'
import store from '@state/store'
import '@components/_globals'

import BootstrapVue from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import Vuelidate from 'vuelidate'
import VueMask from 'v-mask'
import vco from 'v-click-outside'
import VueRouter from 'vue-router'
import VueFeather from 'vue-feather'
import flatPickr from 'vue-flatpickr-component'
import request from '@utils/request'
import VueKeyCloak from '@dsb-norge/vue-keycloak-js'
import _ from 'lodash'
import VueNoty from 'vuejs-noty'

import 'vuejs-noty/dist/vuejs-noty.css'

Vue.use(VueNoty, {
  theme:'sunset',
  timeout: 4000,
  layout: 'bottomRight'
})
Vue.use(VueFeather)
Vue.use(flatPickr)

Vue.use(VueRouter)
Vue.use(vco)

// Don't warn about using the dev version of Vue in development.
Vue.config.productionTip = process.env.NODE_ENV === 'production'

// 全局注册
Vue.prototype.$request = request
Vue.prototype.$_ = _

// If running inside Cypress...
if (process.env.VUE_APP_TEST === 'e2e') {
  // Ensure tests fail when Vue emits an error.
  Vue.config.errorHandler = window.Cypress.cy.onUncaughtException
}

Vue.use(BootstrapVue)
Vue.use(Vuelidate)
Vue.use(VueMask)
Vue.use(require('vue-moment'))

Vue.component('apexchart', VueApexCharts)

// Uncomment this if you are having api served through other url or do not want to use fake backend
// Vue.prototype.$http = require('axios')
// Vue.prototype.$http.defaults.baseURL  = 'http://mock-api.coderthemes.com/'

// const app = null

// Vue.use(VueKeyCloak, {
//   init: {
//     onLoad: 'login-required'
//   },
//   config: {
//     realm: process.env.VUE_APP_AUTH_REALM,
//     url: process.env.VUE_APP_AUTH_URL,
//     clientId: process.env.VUE_APP_AUTH_CLIENT_ID
//   },
//   onReady: kc => {
//     app = new Vue({
//       router,
//       store,
//       render: (h) => h(App),
//     }).$mount('#app')
//   }
// })

// let app = null
// Vue.use(VueKeyCloak, {
//   init: {
//     onLoad: 'login-required',
//     checkLoginIframe: false
//   },
//   config: {
//     url: process.env.VUE_APP_AUTH_URL,
//     realm: process.env.VUE_APP_AUTH_REALM,
//     clientId: process.env.VUE_APP_AUTH_CLIENT_ID,
//   },
//   onReady: kc => {
//     console.log(kc)
//     kc.loadUserProfile().success((data) => {
//       store.commit('auth/SET_CURRENT_USER', data)
//       console.log(data)
//     })
//     app = new Vue({
//       router,
//       store,
//       render: (h) => h(App),
//     }).$mount('#app')
//   }
// })

const app = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

// If running e2e tests...
if (process.env.VUE_APP_TEST === 'e2e') {
  // Attach the app to the window, which can be useful
  // for manually setting state in Cypress commands
  // such as `cy.logIn()`.
  window.__app__ = app
}
