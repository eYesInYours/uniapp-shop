<template>
	<view>
		<view class="settle-container">
			<view class="all-check">
				<radio @click="changeRadioState" size="mini" color="#c00000" :checked="isAllChecked"></radio>
				<text class="check-text">全选</text>
			</view>
			
			<view class="total">
				合计:<text class="total-text">￥{{allPrice}}</text>
			</view>
			
			<view class="settle" @click="checkSettle">
				<text class="settle-text">结算({{total}})</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters, mapMutations, mapState } from 'vuex'
	export default {
		name:"my-settle",
		data() {
			return {
				seconds:3,
				timer:null
			};
		},
		computed:{
			...mapGetters('m_cart',['total','allPrice','isAllChecked']),
			...mapState('m_user',['address','token']),
			...mapState('m_cart',['cart'])
		},
		methods:{
			changeRadioState(){
				this.updateCheckAll(!this.isAllChecked)
			},
			...mapMutations('m_cart',['updateCheckAll']),
			...mapMutations('m_user',['updateRedirectInfo']),
			checkSettle(){
				if(!this.total) return uni.$showMsg("请选择商品！")
				if(!this.address) return uni.$showMsg("请选择地址！")
				if(!this.token) return this.delayNav()
				this.payOrder()
			},
			showTips(n){
				uni.showToast({
					icon:'none',
					title:"请登录后再结算，"+ n +"秒后自动跳转到登录页！",
					// 防止用户点击穿透
					mask:true,
					duration:1500
				})
			},
			// 结算延迟跳转
			delayNav(){
				this.seconds = 3
				this.showTips(this.seconds)
				
				this.timer = setInterval(()=>{
					this.seconds--
					if(this.seconds<=0){
						clearInterval(this.timer)
						return uni.switchTab({
							url:'/pages/my/my',
							success:()=>{
								this.updateRedirectInfo({
									openType:'switchTab',
									from:'/pages/cart/cart'
								})
							}
						})
					}
					this.showTips(this.seconds)
				},1000)
			},
			// 微信支付：由于token并非服务器上，而是手写的，所以微信支付一定失败！！
			async payOrder(){
				// 创建订单必带参数
				const orderInfo = {
					order_price:0.01,			// 开发时写死
					consignee_addr:this.address,
					goods:this.cart.filter(x => x.goods_state)
										.map(x => ({
											goods_id: x.goods_id,
											goods_number: x.goods_count,
											goods_price: x.goods_price
										}))
				}
				const {data: res} = await uni.$http.post('/api/public/v1/my/orders/create')
				if(res.meta.status!==200) return uni.$showMsg("创建订单失败！")
				const orderNumber = res.message.order_number	//订单编号
				// console.log(orderNumber)
				
				const {data:res2} = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder')
				if(res2.meta.status!==200) return uni.$showMsg("预付订单生成失败！")
				const payInfo = res2.message.pay		// 订单信息
				
				cosnt [err, succ] = await uni.requestPayment(payInfo)
				if(err) return uni.$showMsg("订单未支付！")
				// 查询支付结果
				const {data:res3} = await uni.$http.post('/api/public/v1/my/orders/chkOrder',{order_number:orderNumber})
				if(res3.meta.status!==200) return uni.$showMsg("订单未支付！")
				uni.showToast({
					title:"支付完成！",
					icon:success
				})
			}
		}
	}
</script>

<style lang="less">
	.settle-container{
		display:flex;
		justify-content: space-between;
		align-items: center;
		height:46px;
		font-size:14px;
		.all-check{
			padding-left:14px;
		}
		.total{
			.total-text{
				color:#e00000;
			}
		}
		.settle{
			width:90px;
			height:100%;
			background-color:#e00000;
			display:flex;
			justify-content: center;
			align-items: center;
			.settle-text{
				color:white;
			}
		}
	}
</style>