import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/style.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'
import qs from 'qs'


Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:80/blog/'
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'
Vue.prototype.$http = axios
Vue.prototype.$moment = moment
Vue.prototype.qs = qs

axios.defaults.withCredentials = true
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

Vue.use(ElementUi,axios,VueAxios)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
 