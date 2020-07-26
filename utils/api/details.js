// 商品详情页请求
import http from '../http.js';

// 获取一条商品信息
const _getgoodsinfo = (id)=>{
	return http({
		url:'/getgoodsinfo',
		data:{id}
	})
}


export default {
	_getgoodsinfo,//获取一条商品详情
}