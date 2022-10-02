export default {
	// 命名空间：作用域
	namespaced:true,
	
	state:() => ({
		// 每个商品的信息对象，都包含如下 6 个属性：
		// { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
		cart:JSON.parse(uni.getStorageSync('cart') || '[]')
	}),
	
	mutations:{
		// 添加到购物车
		addToCart(state, goods){
			let findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			// console.log(findResult)
			if(!findResult){
				state.cart.push(goods)
			}else{
				// !important
				findResult.goods_count++
			}
			// 必须加前缀
			this.commit('m_cart/saveToStorage')
		},
		// 数据持久化
		saveToStorage(state){
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		},
		// 更新商品勾选状态
		updateCheckState(state,goods){
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if(findResult){
				findResult.goods_state = goods.goods_state
				this.commit('m_cart/saveToStorage')
			}
		},
		// 更新商品的个数
		updateGoodsCount(state,goods){
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if(findResult){
				findResult.goods_count = goods.goods_count
				this.commit('m_cart/saveToStorage')
			}
		},
		// 全选或全不选所有商品
		updateCheckAll(state, newState){
			state.cart.forEach(item => item.goods_state = newState)
			this.commit('m_cart/saveToStorage')
		},
		// 删除购物车商品
		deleteCart(state, goods){
			state.cart = state.cart.filter(item => item.goods_id !== goods.goods_id)			// 保留条件：不等的保留，等删除
			this.commit('m_cart/saveToStorage')
		}
	},
	
	getters:{
		total(state){
			// let c = 0
			// state.cart.forEach(i => c+=i.goods_count)
			// return c
			return state.cart.reduce((pre,item) => pre += item.goods_state?item.goods_count:0,0)
		},
		allPrice(state){
			return state.cart.reduce((price,item) => price += item.goods_state?item.goods_count*item.goods_price:0,0)
		},
		// 全选
		isAllChecked(state){
			return state.cart.every(item => item.goods_state)
		}
	}
}