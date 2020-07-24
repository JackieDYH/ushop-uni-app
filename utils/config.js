// 配置文件
//此域名为其它平台使用 ，h5不需要，因h5浏览器中使用代理
let apiurl = '';
// uEnvDev 开发环境
if (process.env.NODE_ENV === 'development') {
    apiurl = 'http://localhost:3000'
}
// uEnvProd	线上环境
if (process.env.NODE_ENV === 'production') {
    // TODO
	apiurl = 'http://api.xiaoushop.com'
}

export default {
	apiurl,
}