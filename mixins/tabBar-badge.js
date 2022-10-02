import { mapGetters } from 'vuex'

export default {
	computed:{
		...mapGetters('m_cart',['total'])
	},
	onShow(){
		this.setBadge()	
	},
	watch:{
		total(){
			this.setBadge()
		}
	},
	methods:{
		// 设置徽标
		setBadge(){
			uni.setTabBarBadge({
				index:2,		// 需要设置徽标的tabBar下标
				text:this.total +''		// 必须字符串
			})
		}
	}
}