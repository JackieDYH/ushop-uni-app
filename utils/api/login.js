// 用户登录相关接口
import http from '../http.js';

// 短信验证码
const _getSms = (phone)=>{
	return http({
		url:'/sms',
		data:{phone}
	})
}

// 用户登录
const _login = (phone)=>{
	return http({
		url:'/wxlogin',
		data:{ phone }
	})
}

// 检查token是否过期
const _checkToken = (authorization)=>{
	return http({
		url:'/checktoken',
		header:{
			authorization,
			'content-type':'application/x-www-form-urlencoded'
		}
	})
}

// 添加购物车 post请求
const _addCart = (options = {})=>{
	return http({
		url:'/cartadd',
		method:'POST',
		data:options.data,
		header:{
			Authorization:options.token
		}
	})
}

export default {
	_addCart,
	_checkToken,
	_login,
	_getSms,
}