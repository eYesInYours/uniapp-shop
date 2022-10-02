export default {
	namespaced: true,
	
	state:() => ({
		address: JSON.parse(uni.getStorageSync('address') || '{}')
	}),
	
	mutations:{
		// 数据持久化
		saveAddrToStorage(state){
			uni.setStorageSync('address',JSON.stringify(state.address))
		},
		// 更新收货地址
		updateAddr(state,address){
			state.address = address
			this.commit('m_user/saveAddrToStorage')
		}
	},
	
	getters:{
		
	}
}