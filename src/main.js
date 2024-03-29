import Vue from 'vue'
import axios from "./util/axiosTool"
import qs from 'qs'
import App from './page/index.vue'
import './assets/css/style.css'
Vue.config.productionTip = false
Vue.prototype.$qs = qs
Vue.prototype.axios = axios
new Vue({
  render: h => h(App),
}).$mount('#app')
