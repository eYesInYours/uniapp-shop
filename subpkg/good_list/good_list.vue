<template>
	<view>
		<view v-for="(item,index) in goodslist" :key="index" @click="gotoDetail(item)">
				<my-goods :item="item"></my-goods>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj:{
					query:'',
					cid:'',
					pagenum:1,
					pagesize:10,
				},
				goodslist:[],
				total:0,
				isLoading:false
			};
		},
		onLoad(options){
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			
			this.getGoodsList()
		},
		// 触底
		onReachBottom(){
			if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg("数据加载完毕")
			if(this.isLoading) return
			this.queryObj.pagenum++
			this.getGoodsList()
		},
		// 下拉刷新
		onPullDownRefresh(){
				this.queryObj.pagenum = 1
				this.total = 0
				this.goodslist.length = 0
				this.isLoading = false
				this.getGoodsList(() => uni.stopPullDownRefresh())
		},
		methods:{
			async getGoodsList(cb){
				this.isLoading = true
				const {data:res} = await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
				cb && cb()

				if(res.meta.status !== 200) return uni.$showMsg()
				this.goodslist = [...this.goodslist, ...res.message.goods]
				this.total = res.message.total
				this.isLoading = false
			},
			gotoDetail(item){
				uni.navigateTo({
					url:'/subpkg/good_detail/good_detail?goods_id='+item.goods_id
				})
			}
		}
	}
</script>

<style lang="less">
	html{
		background-color:white;
	}
	
</style>
