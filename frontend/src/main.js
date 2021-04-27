import Vue from "vue"
import { BootstrapVue, IconsPlugin } from "bootstrap-vue"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import VueSession from "vue-session"
import helpers from "@/helpers"

import App from "./App.vue"
import router from "./router"

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(helpers)
Vue.use(VueSession)

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app")
