<template>
	<!-- v-if解决屏幕闪烁问题 -->
	<view v-if="goodsInfo.goods_price">
		<!-- 轮播图 -->
		<view class="swiper-box">
			<swiper class="swiper-container" :indicator-dots="true" :autoplay="true" :interval="4000" :duration="1000" circular="true">
				<swiper-item class="swiper-item" v-for="(item,index) in swiperList" :key="index">
					<image class="item-image" :src="item.pics_big" @click="preview(index)"></image>
				</swiper-item>
			</swiper>
		</view>
		
		<!-- 商品信息 -->
		<view class="goods-info-box">
			<view class="goods-price">￥{{goodsInfo.goods_price}}</view>
			<view class="goods-name">
				<view class="goods-name-left">{{goodsInfo.goods_name}}</view>
				<view class="goods-name-right">
					<uni-icons type="star" size="22" color="gray"></uni-icons>
					<text class="right-text">收藏</text>
				</view>
			</view>
			<view class="goods-express">快递：免运费</view>
		</view>
		
		<!-- 渲染服务器返回的html -->
		<view class="render-html">
			<rich-text :nodes="goodsInfo.goods_introduce"></rich-text>
		</view>
		
		<!-- 底部导航 -->
		<view class="goods-bottom-nav">
			<uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick"/>
		</view>
		
	</view>
</template>

<script>
	import { mapState, mapMutations, mapGetters } from 'vuex'
	
	export default {
		computed:{
			...mapState('m_cart',['cart']),
			...mapGetters('m_cart',['total'])
		},
		watch:{
			total:{
				handler(newVal){
					// 可以这样做，但是如果新添加图标就要重新修改
					// this.options[1].info = newVal
					
					const findResult = this.options.find(x => x.text == "购物车")
					if(findResult)	findResult.info = newVal
				},
				immediate:true
			}
		},
		data() {
			return {
				goodsInfo:{},
				swiperList:[],
				goods_id:0,
				
				options: [{
				      icon: 'shop',
				      text: '店铺'
				    }, {
				      icon: 'cart',
				      text: '购物车',
				      info: this.total
				    }],
				// 右侧按钮组的配置对象
				buttonGroup: [{
					text: '加入购物车',
					backgroundColor: '#ff0000',
					color: '#fff'
				  },
				  {
					text: '立即购买',
					backgroundColor: '#ffa200',
					color: '#fff'
				  }
				]
			};
		},
		onLoad(options){
			this.goods_id = options.goods_id
			this.getGoodsDetail()
		},
		methods:{
			async getGoodsDetail(){
				const {data:res} = await uni.$http.get('/api/public/v1/goods/detail?goods_id='+this.goods_id)
				if(res.meta.status !== 200) return uni.$showMsg()
				this.swiperList = res.message.pics
				
				// 解决渲染出来的图片块有间隙
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g,'<img style="display:block;"')
				this.goodsInfo = res.message
			},
			// 预览图片
			preview(index){
				uni.previewImage({
					current:index,	//当前索引
					urls:this.swiperList.map(i => i.pics_big)	//所有图片url数组
				})
			},
			// 底部导航
			onClick (e) {
				console.log(e)
				if(e.content.text === "购物车"){
					uni.switchTab({
						url:'/pages/cart/cart'
					})
				}
			},		
			...mapMutations('m_cart',['addToCart']),
			buttonClick(e) {
			   if (e.content.text === '加入购物车') {
				  const goods = {
					 goods_id: this.goodsInfo.goods_id,
					 goods_name: this.goodsInfo.goods_name,
					 goods_price: this.goodsInfo.goods_price,
					 goods_count: 1,
					 goods_small_logo: this.goodsInfo.goods_small_logo,
					 goods_state: true    // 商品的勾选状态
				  }
				  this.addToCart(goods)
			   }
		}
	},
}
</script>

<style lang="less">
	.swiper-box{
		.swiper-container{
			height:680rpx;
			.swiper-item{
				.item-image{
					width:100%;
					height:100%;
				}
			}
		}
	}
	
	.goods-info-box{
		.goods-price{
			color:#c00000;
			font-size:17px;
			margin:18px 0 5px 5px;
		}
		.goods-name{
			display:flex;
			justify-content:space-between;
			.goods-name-left{
				font-size:14px;
				padding-left:6px;
				padding-right:14px;
			}
			.goods-name-right{
				display:flex;
				flex-direction: column;
				width:100px;
				justify-content: center;
				align-items: center;
				border-left:1px solid #efefef;
				.right-text{
					font-size:13px;
					color:gray;
				}
			}
		}
		.goods-express{
			color:gray;
			font-size:12px;
			margin:6px 0 0 5px;
		}
	}
	
	.render-html{
		margin-top:20px;
		padding-bottom:50px;
	}
	
	.goods-bottom-nav{
		position:fixed;
		bottom:0;
		width:100%;
	}
</style>
