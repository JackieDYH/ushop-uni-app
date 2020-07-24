// index页面所有请求
import http from '../http.js';

// 获取分类信息
const _getTopCateInfo = ()=>{
	return http({
		url:'/getcate'
	})
}

// 获取轮播图信息
const _getbanner = ()=>{
	return http({
		url:'/getbanner'
	})
}


export default {
	_getTopCateInfo,//获取一级分类信息
	_getbanner,//获取轮播图信息
}