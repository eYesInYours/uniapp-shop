export default {
	namespaced: true,
	
	state:() => ({
		address: JSON.parse(uni.getStorageSync('address') || '{}'),		// 收货地址
		token:uni.getStorageSync('token') || "",
		userInfo:JSON.parse(uni.getStorageSync('userInfo') || '{}'),		//登录时获取用户信息
		redirectInfo:null	//用于结算跳转登录页面后，成功登录再跳转回原先页面
	}),
	
	mutations:{
		// 数据持久化
		saveAddrToStorage(state){
			uni.setStorageSync('address',JSON.stringify(state.address))
		},
		saveInfoToStorage(state){
			uni.setStorageSync('userInfo',JSON.stringify(state.userInfo))
		},
		saveTokenToStorage(state){
			uni.setStorageSync('token',JSON.stringify(state.token))
		},
		// 更新收货地址
		updateAddr(state,address){
			state.address = address
			this.commit('m_user/saveAddrToStorage')
		},
		// 更新用户信息
		updateUserInfo(state, info){
			state.userInfo = info
			this.commit('m_user/saveInfoToStorage')
		},
		// 更新token
		updateToken(state, token){
			state.token = token
			this.commit('m_user/saveTokenToStorage')
		},
		updateRedirectInfo(state, info){
			state.redirectInfo = info
			// console.log(state.redirectInfo)
		}
	},
	
	getters:{
		
	}
}