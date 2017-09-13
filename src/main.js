import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import ElementUI from 'element-ui'
import Mint from 'mint-ui';
import 'element-ui/lib/theme-default/index.css'
import 'mint-ui/lib/style.css'
import './assets/css/animate.min.css'
import './assets/css/icon.css'
import './assets/css/reset.css'
Vue.use(ElementUI)
Vue.use(Mint)
//把axios挂到Vue的原型上,全局可用
Vue.prototype.$http = axios
Vue.use(VueRouter)
import routes from './router/router.js'
//实例化路由
const router = new VueRouter({
	mode: 'hash',
	history: false,
	routes,
	linkActiveClass: 'router-active',
	scrollBehavior(to, from, savedPosition) {
		// return 期望滚动到哪个的位置
		return { x: 0, y: 0 };
	}
})
//自定义过滤器，处理评价页的时间
Vue.filter('ratingTime', function (value) {
	let date = new Date(value);
	return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes();
})
new Vue({
	el: '#app',
	router,
	render: h => h(App)
})
