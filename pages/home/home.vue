<template>
	<view>
		<!-- 搜索框 -->
		<view class="search-box">
			<search></search>
		</view>
		
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular>
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<navigator class="swiper-item" :url="'/subpkg/good_detail/good_detail?goods_id='+item.goods_id">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		
		<!-- 导航 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item,index) in navList" :key="index" @click="navSwitch(item)">
				<image class="nav-image" :src="item.image_src"></image>
			</view>
		</view>
		
		<!-- 楼层 -->
		<view class="floor-list">
			<view class="floor-item" v-for="(item,index) in floorList" :key="index">
				<!-- 标题 -->
				<image class="image-title" :src="item.floor_title.image_src"></image>
				<!-- 图片 -->
				<view class="floor-image">
					<navigator class="image-left" :url="item.product_list[0].navigator_url">
						<image :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width+'rpx'}" mode="widthFix"></image>
					</navigator>
					<view class="image-right">
						<navigator v-for="(item2,index2) in item.product_list" :key="index2" :url="item2.navigator_url">
							<image :src="item2.image_src" :style="{width:item2.image_width+'rpx'}" v-if="index2 != 0" mode="widthFix"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList:[],
				navList:[],
				floorList:[]
			};
		},
		onLoad() {
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		},
		methods:{
			async getSwiperList(){
				let {data:res} = await uni.$http.get('/api/public/v1/home/swiperdata')
				if(res.meta.status != 200) return uni.$showMsg()
				this.swiperList = res.message
			},
			async getNavList(){
				let {data:res} = await uni.$http.get('/api/public/v1/home/catitems')
				if(res.meta.status !== 200) return uni.$showMsg()
				this.navList = res.message
			},
			// 点击nav中分类切换到分类页面中去
			navSwitch(item){
				if(item.name === "分类"){
					uni.switchTab({
						url:"/pages/cate/cate"
					})
				}
			},
			async getFloorList(){
				let {data:res} = await uni.$http.get('/api/public/v1/home/floordata')
				if(res.meta.status !== 200) return uni.$showMsg()

				// 处理子包页面的字段数据（修改为自定义路径），点击楼层图片跳转到列表页面上去
				res.message.forEach(floor => {
					floor.product_list.forEach(item => {
						item.navigator_url = "/subpkg/good_list/good_list?" + item.navigator_url.split('?')[1]
					})
				})
				
				this.floorList = res.message
			}
		}
	}
</script>

<style lang="less">
swiper-item{
	height:350rpx;
	.swiper-item, image{
		width:100%;
		height:100%;
	}
}

.nav-list{
	display:flex;
	justify-content:space-around;
	margin:15px 0;
	.nav-image{
		width:128rpx;
		height:140rpx;
	}
}

.image-title{
	width:100%;
	height:60rpx;
}
.floor-image{
	display:flex;
	.image-left{
		margin:0 12rpx;
	}
	.image-right{
		display:flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
}
	.search-box{
		position:sticky;
		top:0;
		z-index:20;
	}
</style>
