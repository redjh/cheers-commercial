import Vue from 'vue'
import App from './App'
import http from './common/interface'
import pageFoot from './components/page-foot/page-foot.vue'

Vue.prototype.$http = http

Vue.config.productionTip = false

Vue.prototype.$goto = function(url) {
	uni.navigateTo({
		url
	})
}
Vue.component('page-foot', pageFoot)

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
