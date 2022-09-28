<template>
	<view>
		<view class="goods-list">
			<view class="goods-list-left">
				<image :src="item.goods_small_logo || defaultPic"></image>
			</view>
			
			<view class="goods-list-right">
				<view class="goods-list-right-title">{{item.goods_name}}</view>
				<view class="goods-list-right-price">￥{{item.goods_price | toFixed}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-goods",
		data() {
			return {
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
			};
		},
		props:{
			item:{
				type:Object,
				default:{}
			}
		},
		filters:{
			toFixed(num){
				return Number(num).toFixed(2)
			}
		}
	}
</script>

<style lang="less">
	.goods-list{
		display:flex;
		padding:8px 3px;
		.goods-list-left{
			margin-right:5px;
			image{
				width: 60px;
				height: 60px;
			}
		}
		.goods-list-right{
			display:flex;
			flex-direction: column;
			justify-content:space-between;
			.goods-list-right-title{
				font-size:13px;
			}
			.goods-list-right-price{
				color:#c00000;
				font-size:15px;
			}
		}
	}
</style>