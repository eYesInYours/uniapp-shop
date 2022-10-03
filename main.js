
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

import store from 'store/store.js'

import {$http} from '@escook/request-miniprogram'

uni.$http = $http
$http.baseUrl = 'https://api-hmugo-web.itheima.net'

// 请求拦截器
$http.beforeRequest = function(options){
	uni.showLoading({
		title:"数据加载中...",
	})
	// console.log(options)
	// 支付相关：含my的为有权限的接口
	if(options.url.indexOf('/my/') !== -1){
		// 请求之前为请求头添加身份认证字段
		options.header = {
			Authorization:store.state.m_user.token
		}
	}
}
// 响应拦截器
$http.afterRequest = function(options){
	uni.hideLoading()
}

// 封装数据请求失败弹框方法
uni.$showMsg = function(title="数据请求失败！", duration=1500){
	uni.showToast({
		title,
		duration,
		icon:"none"
	})
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif