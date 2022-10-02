import Vue from 'vue'
import Vuex from 'vuex'
import module_cart from './cart.js'
import module_user from './user.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	// 挂载store模块
	modules:{
		m_cart: module_cart,
		m_user: module_user
	},
})

export default store