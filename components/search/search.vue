<template>
	<view class="search-box" :style="{'background-color':bgcolor}">
		<view class="search-input" @click="navTo" :style="{'border-radius':radius+'px'}">
			<uni-icons type="search" size="16"></uni-icons>
			<text>搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"search",
		data() {
			return {
				
			};
		},
		props:{
			bgcolor:{
				type:String,
				default:'#c00000'
			},
			radius:{
				type:Number,
				default:19
			}
		},
		methods:{
			navTo(){
				uni.navigateTo({
					url:"/subpkg/search/search"
				})
				this.$emit('click')
			}
		}
	}
</script>

<style lang="less">
	.search-box{
		width:100%;
		height:50px;
		// background-color:#e00000;
		display:flex;
		justify-content:center;
		align-items:center;
		border-bottom:1px solid #e00000;
		margin-bottom:-1px;
		.search-input{
			width:90%;
			height:38px;
			background-color:white;
			// border-radius:19px;
			display:flex;
			justify-content:center;
			align-items: center;
		}
	}
</style>