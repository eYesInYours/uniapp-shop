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
			
			<view class="settle">
				<text class="settle-text">结算({{total}})</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters, mapMutations } from 'vuex'
	export default {
		name:"my-settle",
		data() {
			return {
				isChecked:false
			};
		},
		computed:{
			...mapGetters('m_cart',['total','allPrice','isAllChecked'])
		},
		methods:{
			changeRadioState(){
				this.updateCheckAll(!this.isAllChecked)
			},
			...mapMutations('m_cart',['updateCheckAll'])
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