// 配置文件
//此域名为其它平台使用 ，h5不需要，因h5浏览器中使用代理
let apiurl = '';
// uEnvDev 开发环境
if (process.env.NODE_ENV === 'development') {
    apiurl = 'http://127.0.0.1:3000'
}
// uEnvProd	线上环境
if (process.env.NODE_ENV === 'production') {
    // TODO
	apiurl = 'http://api.xiaoushop.com'
}

// 返回统一的图片域名+地址
const _getImgUrl = (img)=>{
	return apiurl + img;
}

export default {
	_getImgUrl,
	apiurl,//url地址
}