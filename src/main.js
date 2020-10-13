import Vue from 'vue'
import App from './App.vue'
import Router from "./router.js"
import iview from "iview"
import 'iview/dist/styles/iview.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios"

Vue.use(iview)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  router: Router,
  render: h => h(App),
}).$mount('#app')
