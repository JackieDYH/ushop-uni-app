// 请求
import config from './config.js';

export default (options = {}) => {
	//此url是h5的拼接
	// #ifdef H5
	const url = '/api' + options.url;
	// #endif

	// #ifndef H5
	const url = config.apiurl + '/api' + options.url;
	// #endif

	return new Promise((resolve, reject) => {
		uni.request({
			url,
			data: options.data || {},
			method: options.method || 'GET',
			sslVerify: options.sslVerify || false,
			header: options.header || {
				'content-type': 'application/x-www-form-urlencoded'
			},
			success: resolve,
			fail: reject
		})
	})
}
