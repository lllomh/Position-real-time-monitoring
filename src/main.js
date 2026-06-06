import Vue from 'vue'
import axios from "./util/axiosTool"
import qs from 'qs'
import App from './page/index.vue'
import './assets/css/style.css'

console.log(
  '\n' +
  '%c ██╗     ██╗     ██╗      ██████╗ ███╗   ███╗██╗  ██╗ \n' +
  '%c ██║     ██║     ██║     ██╔═══██╗████╗ ████║██║  ██║ \n' +
  '%c ██║     ██║     ██║     ██║   ██║██╔████╔██║███████║ \n' +
  '%c ██║     ██║     ██║     ██║   ██║██║╚██╔╝██║██╔══██║ \n' +
  '%c ███████╗███████╗███████╗╚██████╔╝██║ ╚═╝ ██║██║  ██║ \n' +
  '%c ╚══════╝╚══════╝╚══════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝ \n' +
  '\n' +
  '%c  ⚡  Welcome to LLLOMH · Real-Time Position Monitor  ⚡  \n' +
  '%c  ✦  Author: lllomh · lllomh@qq.com                  ✦  \n',
  'color:#00fff7;font-weight:bold;',
  'color:#00fff7;font-weight:bold;',
  'color:#00d4ff;font-weight:bold;',
  'color:#00d4ff;font-weight:bold;',
  'color:#0099ff;font-weight:bold;',
  'color:#0066ff;font-weight:bold;',
  'background:linear-gradient(90deg,#00fff7,#0066ff);color:#fff;font-weight:bold;padding:4px 12px;border-radius:4px;',
  'color:#888;font-style:italic;',
)
Vue.config.productionTip = false
Vue.prototype.$qs = qs
Vue.prototype.axios = axios
new Vue({
  render: h => h(App),
}).$mount('#app')
