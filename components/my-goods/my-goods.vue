<template>
	<view>
		<view class="goods-list">
			<view class="goods-list-left">
				<radio @click="changeRadio" class="radio-item" v-if="showRadio" :checked="item.goods_state" color="#c00000"></radio>
				<image class="goods-list-left-image" :src="item.goods_small_logo || defaultPic"></image>
			</view>
			
			<view class="goods-list-right">
				<view class="goods-list-right-title">{{item.goods_name}}</view>
				<view class="goods-list-right-price">
					<text class="right-price">￥{{item.goods_price | toFixed}}</text>
					<uni-number-box v-if="showNumberBox" @change="numberChange" class="right-number-box" :value="item.goods_count" :min="1"></uni-number-box>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapMutations } from 'vuex'
	export default {
		name:"my-goods",
		data() {
			return {
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
			};
		},
		methods:{
			// 触发父组件自定义事件，在其中使用vuex修改勾选状态
			changeRadio(){
				this.$emit('radioHandler',{
					goods_id: this.item.goods_id,
					goods_state: !this.item.goods_state
				})
			},
			// uni-number-box修改事件
			numberChange(newVal){
				this.item.goods_count = newVal
				this.updateGoodsCount(this.item)
			},
			...mapMutations('m_cart',['updateGoodsCount'])
		},
		props:{
			item:{
				type:Object,
				default: {}
			},
			showRadio:{
				type:Boolean,
				default: false
			},
			showNumberBox:{
				type:Boolean,
				default: false,
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
			display:flex;
			.radio-item{
				display:flex;
				align-items: center;
				padding:0 5px;
				height:60px;
			}
			.goods-list-left-image{
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
				display:flex;
				justify-content: space-between;
				align-items: center;
				.right-price{
					color:#c00000;
					font-size:15px;
				}
				.right-number-box{
					height:20px;
				}
			}
		}
	}
	
		

</style>