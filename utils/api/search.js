// 分类列表请求 一 二级
import http from '../http.js';

// 模糊搜索
const _getSearchGoods = (searchText)=>{
	return http({
		url:'/getsearch',
		data:{searchText}
	})
}

// 获取一/二级商品信息
const _getcategoods = (data={})=>{
	return http({
		url:"/getcategoods",
		data,
	})
}

export default {
	_getSearchGoods,
	_getcategoods,
}