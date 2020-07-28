<template>
	<view class="box">
		<view class="row">
			<text>手机号</text>
			<input type="text" v-model="phone" maxlength="11"/>
		</view>
		<view class="row">
			<view class="send">
				<text>密码</text>
			</view>
			<input type="password" v-model="pwd" placeholder="- - - - - - - -" maxlength="16" />
		</view>
		<view class="row">
			<text style="font-size: 23rpx;">没有账号？试试 <text style="color:#00BB00;font-size: 23rpx;" @click="_goToLogon"> 注册</text></text>
			<!--   -->
			<button  :disabled="!(pwd.length >= 4)" @click="_doLogin" type="primary" style="width: 90%;border-radius: 80rpx;margin-top: 50rpx;">登录</button>
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
				phone:'',
				pwd:'',
			}
			
		},
		methods: {
			_goToLogon(){
				uni.navigateTo({
					url:'../logon/logon'
				})
			},
			// 2 点击登录登录按钮，进行匹配用户输入的验证码是不是和你手机上接口的验证码是否正确
			async _doLogin(){
				if(!/^1[3456789]\d{9}$/.test(this.phone)){
					tool._showToast({title:"手机号非法"});
					return false;
				}
				try{
					const loginInfo = await api._logins(this.phone,this.pwd);
					console.log(loginInfo,'logininfo')
					if(loginInfo.data.code != 200){
						tool._showToast({title:loginInfo.data.msg});
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
