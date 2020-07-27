<script>
	// 项目的根组件
	import api from './utils/api/login.js';
	import tool from './utils/tool.js';
	
	export default {
		async onLaunch() {
			if(process.env.NODE_ENV === 'development'){
				//做开发操作配置设置
			    console.log('开发环境')
			}else{
				// 做生产环境配置设置
			    console.log('生产环境')
			}
			
			/*
				一打开咱们商品应用 ，在onLaunch的时候检查token是否过期
				如果过期，是在缓存中存储的token和用户的uid同时把globalData.authorization清除
				如果没有过期，缓存不清除，
				同时未app的globalData.authorization 赋值
			*/ 
			// 从缓存获取用户状态信息
			const userInfo = tool._getStorage("userInfo");
			const checkRes = await api._checkToken(userInfo.token);
			if(checkRes.data.list.code != 200){
				console.log('token已过期');
				// 还原数据
				this.globalData.authorization = '';
				this.globalData.uid = '';
				tool._removeStorage('userInfo');
			}else{
				console.log('未过期');
				this.globalData.authorization = userInfo.token;
				this.globalData.uid = userInfo.uid;
			}
			
			
		},
		globalData:{
			authorization:'',//这是存储token
			uid:''
		}
	}
</script>

<style>
	/*每个页面公共css */

</style>
