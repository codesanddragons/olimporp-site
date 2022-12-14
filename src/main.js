import Vue from 'vue'
import App from './App.vue'
import router from './plugins/router'
import { BootstrapVue, IconsPlugin,BootstrapVueIcons  } from 'bootstrap-vue'
import store from './store/store'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './plugins/axios'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(BootstrapVueIcons)



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
