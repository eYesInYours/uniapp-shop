<template>
	<view>
		<view class="login-container">
			<uni-icons type="contact-filled" size="100"></uni-icons>
			<button class="login-container-button" type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
			<text class="login-container-text">登录后尽享更多权益</text>
		</view>
	</view>
</template>

<script>
	import { mapMutations, mapState } from 'vuex'
	export default {
		name:"my-login",
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('m_user',['redirectInfo']),
		},
		methods:{
			...mapMutations('m_user',['updateUserInfo','updateToken','updateRedirectInfo']),
			async getUserInfo(){
				const [err, res] = await uni.getUserInfo().catch(err => err)
				// console.log(err, res)
				if(err || res.errMsg !== "getUserInfo:ok") return uni.$showMsg("您取消了授权！")
				this.getToken(res)
				this.updateUserInfo(res.userInfo)
			},
			// 获取token
			async getToken(info){
				const [err, res] = await uni.login().catch(err => err)
				if(err || res.errMsg !== "login:ok") return uni.$showMsg("登录失败")
				const query = {
					code:res.code,
					encryptedData:info.encryptedData,
					iv:info.iv,
					rawData:info.rawData,
					signature:info.signature
				}
				const data = await uni.$http.post('/api/public/v1/users/wxlogin',query)
				// console.log(data)  
				// 获取不到token（服务器原因），手写一个，以便继续之后的内容
				const token = 'hello world'
				this.updateToken(token)
				this.backCart()
			},
			backCart(){
				if(this.redirectInfo && this.redirectInfo.openType == "switchTab"){
					uni.switchTab({
						url:this.redirectInfo.from,
						complete:()=>{
							this.updateRedirectInfo(null)
						}
					})
				}
			}
		}
	}
</script>

<style lang="less">
	page{
		background-color:white;
	}
	.login-container{
		display:flex;
		justify-content: center;
		align-items:center;
		height:750rpx;
		background-color:#f8f8f8;
		flex-direction: column;
		position:relative;
		overflow:hidden;
		.login-container-button{
			width:90%;
			border-radius:100px;
			background-color:#e00000;
			margin:14px 0;
		}
		.login-container-text{
			font-size:14px;
			color:gray;
		}
		&::after{
			content:' ';
			display:block;
			width:100%;
			height:44px;
			border-radius:100%;
			background-color:white;
			position:absolute;
			bottom:0;
			left:0;
			transform:translateY(50%);
		}
	}
</style>