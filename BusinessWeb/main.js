import Vue from 'vue'
import uView from "uview-ui";
import App from './App'
import Request from './js_sdk/pocky-request/pocky-request v.2.0.4/index'

Vue.config.productionTip = false
Vue.use(uView);
global.$http = Request();//请求
App.mpType = 'app'
// Vue.prototype.APIS = 'http://192.168.31.84:80'; 
// Vue.prototype.APIS = 'http://192.168.31.93:81'; 
// Vue.prototype.APIS = 'http://192.168.31.114:63'; 
// Vue.prototype.APIS = 'http://192.168.1.3:83'; 
Vue.prototype.APIS = 'https://www.callingsell.com'; 
// Vue.prototype.APIS = ''; 

const app = new Vue({
	...App
})
app.$mount()
