<template>
	<view>
		<!-- 购物车有内容时 -->
		<view class="cart-container" v-if="cart.length!=0">
			<my-address></my-address>
			
			<view class="cart-title">
				<uni-icons type="cart" size="18" class="uni-icons"></uni-icons>
				<text class="cart-text">购物车</text>
			</view>
		
			<uni-swipe-action>
				<block class="cart-item" v-for="(item,index) in cart" :key="index">
					<uni-swipe-action-item :right-options="options" @click="deleteSwipeHandler(item)">
						<my-goods :item="item" :showRadio="item.goods_state" :showNumberBox="true" @radioHandler="radioHandler"></my-goods>
					</uni-swipe-action-item>
				</block>
			</uni-swipe-action>
			
			<view class="final-settle">
				<my-settle></my-settle>
			</view>
		</view>
		
		<!-- 空购物车 -->
		<view class="emptyCart" v-else>
			<image class="emptyCart-image" src="@/static/cart_empty@2x.png"></image>
			<text class="emptyText">空空如也~</text>
		</view>
		
		
	</view>
</template>

<script>
	import badge from '@/mixins/tabBar-badge.js'
	import { mapState, mapMutations } from 'vuex'
	export default {
		data() {
			return {
				options:[
				        {
				            text: '删除',
				            style: {
				                backgroundColor: '#e00000'
				            }
				        }]
			};
		},
		mixins:[badge],
		computed:{
			...mapState('m_cart',['cart'])
		},
		methods:{
			radioHandler(e){
				this.updateCheckState(e)
			},
			...mapMutations('m_cart',['updateCheckState','deleteCart']),
			// 删除购物车中商品
			deleteSwipeHandler(item){
				// console.log(e)
				console.log(item)
				this.deleteCart(item)
			}
		}
	}
</script>

<style lang="less">
	.final-settle{
		position:fixed;
		bottom:0;
		width:100%;
	}
	
	.cart-title{
		padding-left:3px;
		height: 40px;
		display:flex;
		align-items:center;
		border-bottom:1px solid #efefef;
		margin-bottom:6px;
		.uni-icons{
			margin-right:2px;
		}
		.cart-text{
			font-size:13px;
		}
	}
	
	.emptyCart{
		display:flex;
		flex-direction: column;
		height:500px;
		align-items: center;
		justify-content:center;
		.emptyCart-image{
			width: 60px;
			height: 60px;
			margin-bottom:12px;
		}
		.emptyText{
			font-size:14px;
			padding-left:5px;
			color:gray;
		}
	}
</style>
