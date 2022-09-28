<template>
	<view>
		<view class="search-box">
			<uni-search-bar radius="19" @input="input" cancelButton="none" placeholder="请输入内容"></uni-search-bar>
		</view>
			
			<!-- 搜索列表 -->
			<view class="search-list" v-if="searchResult.length!==0">
				<view class="search-item" v-for="(item,index) in searchResult" :key="index">
					<view class="search-text-content">{{item.goods_name}}</view>
					<uni-icons type="forward" size="16"></uni-icons>
				</view>
			</view>

			<!-- 搜索历史 -->
			<view class="search-history" v-else>
				<view class="history-top">
					<text>搜索历史</text>
					<uni-icons type="trash-filled" size="18" @click="deleteHistory"></uni-icons>
				</view>
				<view class="history-bottom">
					<view class="history-bottom-content" v-for="(item2,index2) in historyResult" :key="index2">
						<uni-tag :text="item2" type="default" inverted="true"  @click="navToGoodList(item2)"></uni-tag>
					</view>
				</view>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchResult:[],
				kw:'',
				timer:null,
				historyList:[]
			};
		},
		methods:{
			async input(value){
				clearInterval(this.timer)
				this.timer = setTimeout (()=>{
					this.kw = value
					this.getSearchResult()
				},500)
			},
			async getSearchResult(){
				if(this.kw.length === 0) return this.searchResult.length=0
				const {data:res} = await uni.$http.get('/api/public/v1/goods/search',{query:this.kw})
				if(res.meta.status !== 200) return uni.$showMsg()
				this.searchResult = res.message.goods
				
				// 不仅仅是去重的效果，还要使新添加的历史记录在最前面
				let historySet = new Set(this.historyList)
				historySet.delete(this.kw)
				historySet.add(this.kw)
				this.historyList = Array.from(historySet)
				
				// 数据（历史记录）持久化到本地
				uni.setStorageSync('kw',JSON.stringify(this.historyList))
			},
			deleteHistory(){
				this.historyList = []
			},
			navToGoodList(item){
				uni.navigateTo({
					url:'/subpkg/good_list/good_list?query='+kw
				})
			}
		},
		computed:{
			historyResult(){
				return [...this.historyList].reverse()
			}
		},
		onLoad(){
			// 获取持久化历史记录
			this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
		}
	}
</script>

<style lang="less">
	html{
		background-color:white;
	}
	.search-box{
		height:50px;
		background-color:#c00000;
		display:flex;
		align-items: center;
		uni-search-bar{
			width:100%;
		}
	}
	
	.search-list{
		.search-item{
			display: flex;
			justify-content:space-between;
			background-color:white;
			align-items: center;
			height:40px;
			border-bottom:1px solid #efefef;
			padding-left:4px;
			.search-text-content{
				font-size:14px;
				white-space:nowrap;
				overflow: hidden;
				text-overflow:ellipsis;	
			}
		}
	}
	
	.search-history{
		.history-top{
			display:flex;
			justify-content:space-between;
			height:36px;
			align-items:center;
			background-color:white;
			border-bottom:1px solid #efefef;
			text{
				font-size:15px;
				padding-left:5px;
			}
			uni-icons{
				padding-right:5px;
			}
		}
		.history-bottom{
			display:flex;
			flex-direction: row;
			flex-wrap: wrap;
			.history-bottom-content{
				margin:5px 0 0 5px;
			}
		}
	}
</style>
