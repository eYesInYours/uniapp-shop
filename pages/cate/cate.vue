<template>
	<view>
		<view class="scroll-view-container">
			
			<scroll-view class="scroll-view-left" scroll-y="true" :style="{height:wh+'px'}">
				<view :class="['scroll-view-left-item',index === active ? 'active' : '']" 
						v-for="(item,index) in cateList" 
						:key="index" @click="selected(index)">{{item.cat_name}}</view>
			</scroll-view>
			
			<scroll-view :scroll-top="scrollTop" class="scroll-view-right" scroll-y="true" :style="{height:wh+'px'}">
				<block v-for="(item2,index2) in cateLevel2" :key="index2">
					<view class="scroll-view-right-title">/ {{item2.cat_name}} /</view>
					
					<view class="scroll-view-right-cateLevel3-list">
						<navigator :url="'/subpkg/good_list/good_list?cid='+item3.cat_id" class="scroll-view-right-cateLevel3-item" v-for="(item3,index3) in item2.children">
							<image :src="item3.cat_icon"></image>
							<text>{{item3.cat_name}}</text>
						</navigator>
					</view>
				</block>
			</scroll-view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cateList:[],
				cateLevel2:[],	// 二级菜单
				active:0,		// 默认第一个选项选中
				wh:0,
				scrollTop:0,	
			};
		},
		onLoad(){
			this.getCateList()
			//获取设备信息
			const sysInfo = uni.getSystemInfoSync()
			const wh = sysInfo.windowHeight
			this.wh = wh
		},
		methods:{
			async getCateList(){
				let {data:res} = await uni.$http.get('/api/public/v1/categories')
				if(res.meta.status !== 200) return uni.$showMsg()
				this.cateList = res.message
				this.cateLevel2 = res.message[0].children
			},
			// 左scroll选中效果切换，并且重新渲染二级、三级列表
			selected(index){
				this.active = index
				// 修改二级数据
				this.cateLevel2.length = 0 
				this.cateLevel2 = this.cateList[index].children
				// 切换一级时，二级的滚动条应该置顶
				this.scrollTop = this.scrollTop===0 ? 0.1 : 0	
			}
		}
	}
</script>

<style lang="less">
	.scroll-view-container{
		display:flex;
		justify-content:space-around;
		
		.scroll-view-left{
			width:90px;
			
			.scroll-view-left-item{
				width:90px;
				line-height:40px;
				text-align:center;
				background-color:#f3f3f3;
				font-size:14px;
				
				&.active{
					background-color:white;
					position:relative;
					&::before{
						content:' ';
						display:block;
						width:3px;
						height:22px;
						background-color:#c00000;
						position:absolute;
						top:25%;
						left:0;
					}
				}
			}
		}
		
		.scroll-view-right{
			background-color:white;
			
			.scroll-view-right-title{
				text-align: center;
				font-weight: bold;
				font-size:14px;
				padding:16px 0;
			}
			.scroll-view-right-cateLevel3-list{
				display:flex;
				flex-wrap: wrap;
				.scroll-view-right-cateLevel3-item{
					width:33.33%;
					display:flex;
					flex-direction: column;
					image{
						width: 60px;
						height: 60px;
						margin:0 auto;
					}
					text{
						font-size:12px;
						text-align:center;
					}
				}
			}
		}
	}
</style>
