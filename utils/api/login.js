// 用户登录相关接口
import http from '../http.js';

// 短信验证码
const _getSms = (phone)=>{
	return http({
		url:'/sms',
		data:{phone}
	})
}

// 用户登录 手机号登录注册
const _login = (phone)=>{
	return http({
		url:'/wxlogin',
		data:{ phone }
	})
}

// 注册 手机号登录注册 phone, nickname, password
const _register = (phone,nickname,password)=>{
	return http({
		url:'/register',
		method:'POST',
		data:{ phone,nickname,password }
	})
}

// 手机号密码登录
const _logins = (phone,password)=>{
	return http({
		url:'/login',
		method:'POST',
		data:{phone,password}
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

// 获取购物车列表信息
const _getCartList = ( options={} )=>{
	return http({
		url:'/cartlist',
		data:options.data,  //{ uid:uid }
		header:{
			authorization:options.token
		}
	})
}

// 修改购物车接口
const _setCartEdit = (options = {})=>{
	return http({
		url:'/cartedit',
		method:'POST',
		data:options.data,
		header:{
			authorization:options.token
		}
	})
}

//购物车商品的 删除
const _cartDelete = ( options = {})=>{
	return http({
		url:'/cartdelete',
		method:'POST',
		data:options.data,//购物车编号的id
		header:{
			authorization:options.token
		}
	})
}

//添加订单
const _addOrders = ( options={} )=>{
	return http({
		url:'/orderadd',
		data:options.data,
		header:{
			authorization:options.token
		}
	})
}

//获取订单列表
const _getOrder = ( options={} )=>{
	
	return http({
		url:'/orders',
		data:options.data,
		header:{
			authorization:options.token
		}
	})
}


export default {
	_getOrder,
	_addOrders,
	_cartDelete,
	_setCartEdit,
	_getCartList,
	_addCart,
	_checkToken,
	_login,
	_logins,
	_register,
	_getSms,
}