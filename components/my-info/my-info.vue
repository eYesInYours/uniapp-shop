<template>
	<view class="global-box">
		<view class="top-box">
			<image class="avatar" :src="userInfo.avatarUrl"></image>
			<text class="nickName">{{userInfo.nickName}}</text>
		</view>
		
			<view class="favorite">
				<view class="fav-item">
					<text>8</text>
					<text>收藏的店铺</text>
				</view>
				<view class="fav-item">
					<text>14</text>
					<text>收藏的商品</text>
				</view>
				<view class="fav-item">
					<text>18</text>
					<text>关注的商品</text>
				</view>
				<view class="fav-item">
					<text>84</text>
					<text>足迹</text>
				</view>
			</view>
			<view class="my-order">
				<view class="order-title">我的订单</view>
				<view class="order-list">
					<view class="order-item">
						<image class="item-image" src="@/static/my-icons/icon1.png"></image>	
						<text class="item-text">待付款</text>	
					</view>
					<view class="order-item">
						<image class="item-image" src="@/static/my-icons/icon2.png"></image>	
						<text class="item-text">待收货</text>	
					</view>
					<view class="order-item">
						<image class="item-image" src="@/static/my-icons/icon3.png"></image>	
						<text class="item-text">退款/退货</text>	
					</view>
					<view class="order-item">
						<image class="item-image" src="@/static/my-icons/icon4.png"></image>	
						<text class="item-text">全部订单</text>	
					</view>
				</view>	
			</view>
			<view class="quit">
				<view class="quit-item">
					<text class="item-text">收货地址</text>	
					<uni-icons type="arrow-right" size="18"></uni-icons>
				</view>
				<view class="quit-item">
					<text class="item-text">联系客服</text>
					<uni-icons type="arrow-right" size="18"></uni-icons>
				</view>
				<view class="quit-item" @click="logout">
					<text class="item-text">退出登录</text>
					<uni-icons type="arrow-right" size="18"></uni-icons>
				</view>
			</view>

	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	export default {
		name:"my-info",
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('m_user',['userInfo'])
		},
		methods:{
			...mapMutations('m_user',['updateAddr','updateUserInfo','updateToken']),
			async logout(){
				const [err, succ] = await uni.showModal({
					title:"提示",
					content:"确认退出登录吗？"
				}).catch(err => err)
				if(succ && succ.confirm){
					this.updateAddr({})
					this.updateUserInfo({})
					this.updateToken("")
				}
			}
		}
	}
</script>

<style lang="less">
	.top-box{
		height:420rpx;
		background-color:#c00000;
		display:flex;
		flex-direction: column;
		justify-content:center;
		align-items: center;
		.avatar{
			width:56px;
			height:56px;
			border-radius: 28px;
			border:2px solid white;
			margin-bottom:14px;
			box-shadow:0 2px 4px #e8e8e8;
		}
		.nickName{
			color:white;
			font-weight:bold;
		}
	}
	
		.favorite{
			display:flex;
			justify-content:space-around;
			height:58px;
			align-items:center;
			background-color:white;
			margin:-14px 14px 0;
			.fav-item{
				display:flex;
				flex-direction: column;
				justify-content: center;
				align-items:center;
				font-size:15px;
			}
		}
		.my-order{
			display:flex;
			justify-content: space-around;
			flex-direction: column;
			margin:14px;
			background-color:white;
			.order-title{
				height:30px;
				line-height:30px;
				padding-left:4px;
				font-size:15px;
				border-bottom:1px solid #efefef;
			}
			.order-list{
				display:flex;
				flex-wrap:nowrap;
				justify-content: space-around;
				height:56px;
				align-items:center;
				.order-item{
					display:flex;
					flex-direction: column;
					justify-content: center;
					align-items:center;
					.item-image{
						width: 20px;
						height: 20px;
					}
					.item-text{
						font-size:14px;
					}
				}
			}
		}
		.quit{
			background-color:white;
			margin:0 14px;
			.quit-item{
				display:flex;
				justify-content:space-between;
				align-items:center;
				height:36px;
				border:1px solid #f8f8f8;
				.item-text{
					font-size:14px;
					padding-left:4px;
				}
			}
		}
	
	page{
		background-color:#efefef!important;
	}
</style>