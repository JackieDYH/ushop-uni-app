// 分类页请求
import http from '../http.js';

// 获取分类 树型结构
const _getcatelist = ()=>{
	return http({
		url:'/getcatelist'
	})
}

export default {
	_getcatelist,
}