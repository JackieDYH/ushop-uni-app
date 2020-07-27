<template>
	<view class="box">
		<view class="row">
			<text>手机号</text>
			<input type="text" v-model="phone" maxlength="11"/>
		</view>
		<view class="row">
			<view class="send">
				<text>验证码</text>
				<text @click="_getSmsCode">{{djsStr}}</text>
			</view>
			<input type="text" v-model="code" @input="_codeInput" placeholder="- - - -" maxlength="4" />
		</view>
		<view class="row">
			<text style="font-size: 23rpx;">收不到验证码？试试 <text style="color:#00BB00;font-size: 23rpx;"> 语音验证</text></text>
			<!--   -->
			<button  :disabled="code.length !== 4" @click="_doLogin" type="primary" style="width: 90%;border-radius: 80rpx;margin-top: 50rpx;">登录</button>
		</view>
		<view class="row">
			<text style="color: #006699;text-align: center;" >通过微信授权登录</text>
		</view>
	</view>
</template>

<script>
	
	import api from '../../utils/api/login.js';
	import tool from '../../utils/tool.js';
	
	let app = getApp()
	
	export default {
		data() {
			return {
				code:'',
				phone:'',
				// isLogin:true,//登录按钮，默认禁用，
				djsStr:'获取验证码',
				buffer:true,//可以获取验证码
			}
			
		},
		methods: {
			// 2 点击登录登录按钮，进行匹配用户输入的验证码是不是和你手机上接口的验证码是否正确
			async _doLogin(){
				try{
					const loginInfo = await api._login(this.phone);
					console.log(loginInfo,'logininfo')
					if(loginInfo.data.code != 200){
						tool._showToast({title:'登录失败'});
						return false;
					}
					//存储token和uid到缓存中 同时把appvue和globaldata中的token更新一下，以供其它地方使用
					tool._setStorage("userInfo",loginInfo.data.list);
					app.globalData.authorization = loginInfo.data.list.token;
					app.globalData.uid = loginInfo.data.list.uid;
					// 跳转到个人中心
					uni.switchTab({
						url:'../mine/mine'
					})
					
				}catch(err){
					console.log(err,'登录错误');
				}
			},
			
			//1 获取验证码，同时把把验证存储在缓存中，同时手机号上也会获取到
			async _getSmsCode(){
				let s = 60;
				if(!this.buffer){
					return;
				}
				
				// 验证手机号
				if(!/^1[3456789]\d{9}$/.test(this.phone)){
					tool._showToast({
						title:'请输入合法手机号',
						icon:'loading'
					})
					return false;
				}
				setInterval(()=>{
					s--;
					let djsStr = '';
					if(s>0){
						djsStr = s + '秒后重新获取';
					}else{
						djsStr = '获取验证码';
						this.buffer = true;
					}
					this.djsStr = djsStr;
				},1000);
				this.buffer = false;
				
				try{
					// 验证通过发送请求
					const codeInfo = await api._getSms(this.phone);
					console.log(codeInfo,'code');
					//3. 把后端返回的验证码存储到前端的缓存中。实际开发中，后端会存储在session
					tool._setStorage("code",codeInfo.data.list.code);
				}catch(err){
					console.log(err,'获取验证码错误')
				}
				
				
				
				
			},
			
		}
	}
</script>

<style>
	/* 导入外部的样式文件 */
	/* @import url("../../common/css/index.css"); */
	.box{
		position: relative;
	}

	.row{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin: 40rpx;
	}
	.send{
		display: flex;
		justify-content: space-between;
	}
	.send text:nth-of-type(2){
		color: #00BB00;
	}
	text{
		font-size: 27rpx;
		margin-bottom: 10rpx;
	}
	input{
		border-bottom: 1rpx solid gray;
		height: 65rpx;
	}
	
</style>
