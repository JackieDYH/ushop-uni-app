<template>
	<view class="box">
		<view class="row">
			<text>用户名</text>
			<input type="text" v-model.trim="username" maxlength="26"/>
		</view>
		<view class="row">
			<view class="send">
				<text>密码</text>
			</view>
			<input type="password" v-model.trim="pwd" placeholder="- - - - - - - -" maxlength="16" />
		</view>
		<view class="row">
			<view class="send">
				<text>确认密码</text>
			</view>
			<input type="password" v-model.trim="pwd1" @blur="_pwdyz" placeholder="- - - - - - - -" maxlength="16" />
		</view>
		<view class="row">
			<text>手机号</text>
			<input type="text" v-model.trim="phone" maxlength="11"/>
		</view>
		<view class="row">
			<view class="send">
				<text>验证码</text>
				<text @click="_getSmsCode">{{djsStr}}</text>
			</view>
			<input type="text" v-model.trim="code" @blur="_codeyz" placeholder="- - - -" maxlength="4" />
		</view>
		<view class="row">
			<text style="font-size: 23rpx;">已有账号？试试 <text style="color:#00BB00;font-size: 23rpx;" @click="_goToRegister"> 账号密码登录</text> / <text style="color:#059abb;font-size: 23rpx;" @click="_goToSend"> 验证码登录</text></text>
			<!--   -->
			<button :disabled="!(ispwd && iscode)" @click="_doLogin" type="primary" style="width: 90%;border-radius: 80rpx;margin-top: 50rpx;">登录</button>
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
				username:'',
				pwd:'',
				pwd1:'',
				code:'',//用户输入的验证码
				codes:'',//获取到的验证码
				phone:'',
				djsStr:'获取验证码',
				ispwd:false,//是否可以登录
				iscode:false,//是否可以登录
				buffer:true,//可以获取验证码
			}
			
		},
		methods: {
			// 验证密码是否一致 ispwd
			_pwdyz(){
				if(this.pwd !== this.pwd1){
					tool._showToast({
						title:"密码不一致"
					})
					this.ispwd=false;
				}else{
					this.ispwd=true;
				}
			},
			// 验证码验证
			_codeyz(){
				if(this.code !== String(this.codes)){
					tool._showToast({
						title:"验证码错误"
					})
					this.iscode=false;
				}else{
					this.iscode=true;
				}
			},
			
			// 跳转页面
			_goToRegister(){
				uni.navigateTo({
					url:'../register/register'
				})
			},
			_goToSend(){
				uni.navigateTo({
					url:'../send/send'
				})
			},
			// 2 点击登录登录按钮，进行匹配用户输入的验证码是不是和你手机上接口的验证码是否正确
			async _doLogin(){
				try{
					if(this.code !== String(this.codes)){
						tool._showToast({
							title:"验证码错误"
						})
						this.iscode=false;
						return false;
					}
					
					if(this.pwd !== this.pwd1){
						tool._showToast({
							title:"密码不一致"
						})
						this.ispwd=false;
						return false;
					}
					
					const loginInfo = await api._register(this.phone,this.username,this.pwd);
					console.log(loginInfo,'logininfo')
					if(loginInfo.data.code != 200){
						tool._showToast({title:loginInfo.data.msg});
						return false;
					}else{
						tool._showToast({title:loginInfo.data.msg});
						// 跳转到个人中心
						setTimeout(()=>{
							uni.navigateTo({
								url:'../register/register'
							})
						},2000)
					}
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
					this.codes = codeInfo.data.list.code;
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
