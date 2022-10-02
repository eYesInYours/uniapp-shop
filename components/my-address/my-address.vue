<template>
	<view>
			<!-- 添加收获地址的按钮 -->
			<view class="addr" v-if="JSON.stringify(address) === '{}'">
				<button type="primary" size="mini" @click="chooseAddress">请选择收获地址+</button>
			</view>
			
			<!-- 具体地址 -->
			<view class="address-info" v-else @click="chooseAddress">
				<view class="people-info">
					<view class="people">收货人：{{address.userName}}</view>
					<view class="tel">电话：{{address.telNumber}}</view>
				</view>
				<view class="shipping-address">
					<text>收货地址：{{concatAddress}}</text>
				</view>
			</view>
			
			<!-- 边框 -->
			<image class="border-image" src="@/static/cart_border@2x.png"></image>
	</view>
</template>

<script>
	import { mapMutations, mapState } from 'vuex'
	export default {
		name:"my-address",
		data() {
			return {
				// address:{}
			};
		},
		computed:{
			...mapState('m_user',['address']),
			concatAddress(){
				return this.address.provinceName + this.address.cityName + this.address.countyName + this.address.detailInfo
			}
		},
		methods:{
			...mapMutations('m_user',['updateAddr']),
			// 选择收货地址：确定时返回第一个为err，第二个是具体信息；取消时只返回一个err对象
			async chooseAddress(){
				const [err, succ] = await uni.chooseAddress().catch(err => err)
				// console.log(err,succ)
				if(err == null && succ.errMsg == "chooseAddress:ok"){
					// this.address = succ
					this.updateAddr(succ)
				}
			},
			// 重新选择收货地址
			updateAddress(){
				console.log('ok')
				console.log(JSON.stringify(this.address))
			}
		}
	}
</script>

<style lang="less">
	.addr{
		height:86px;
		display:flex;
		justify-content: center;
		align-items:center;
	}
	
	.border-image{
		display:block;
		height:2px;
		width:100%;
	}
	
	.address-info{
		display:flex;
		align-items: center;
		flex-wrap: wrap;
		height:66px;
		padding:10px 3px;
		font-size:14px;
		
		.people-info{
			display:flex;
			justify-content:space-between;	
			width:100%;
		}
	}
</style>