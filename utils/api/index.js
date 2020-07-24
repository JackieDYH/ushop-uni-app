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

//获取倒计时
const _getSecKill = ()=>{
	return http( {
		url:'/getseckill'
	} )
}

// 获取 首页 推荐 、最新、所有 商品数据
const _getIndexGoods = ()=>{
	return http({
		url:'/getindexgoods'
	})
}

export default {
	_getIndexGoods,//选项卡 商品信息获取
	_getSecKill,//获取秒杀商品信息
	_getTopCateInfo,//获取一级分类信息
	_getbanner,//获取轮播图信息
}