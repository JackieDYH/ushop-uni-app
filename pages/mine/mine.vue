<template>
	<view class="container">
		<!-- 顶部头像部分 -->
		<view class="mineTop">
			<view class="mineTop_left">
				<view class="mineTop_left_image">
					<image src="../../static/mine/timg.jpg" mode=""></image>
				</view>
				<view class="mineTop_left_info">
					<text for="" style="color: #fff;">{{userInfo.nickname}}</text>
					<text for="">{{userInfo.phone}}</text>
				</view>		
			</view>
			<view class="mineTop_right">
				<view class="mineTop_right_info">
					<text for="">每日签到</text>
				</view>
			</view>
		</view>
		
		<!-- 订单状态 -->
		<view class="order_state">
			<view class="order_state_list" v-for="(list,ind) in orderList" :key="ind" @click="_goToList(ind)">
				<image :src="list.icon" mode=""></image>
				<text class="list_text">{{ list.name }}</text>
			</view>
		</view>
		
		<!-- 个人信息 -->
		<view class="person_msg">
			<view class="person_msg_list" v-for="(item,ind) in personMsgList" :key="ind">
				<view class="person_msg_list_info">
					<image :src="item.icon" alt class="MsgItemLogo" />
					<text>{{item.name}}</text>
				</view>	
				<view class="MsgItemRight">
				   <text class="remaB" v-show="item.remaBala">200余额</text>
				   <image src="../../static/mine/xiayiye.png" alt class="MsgItemDetail" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tool from '../../utils/tool.js';
	const app = getApp();
	
	export default {
		data(){
			return {
				userInfo:'',//用户信息
				// 订单状态信息
				orderList: [{
					name: "全部订单",
					icon: "../../static/mine/quanbudingdan.png"
				  },
				  {
					name: "待付款",
					icon: "../../static/mine/daifukuan.png"
				  },
				  {
					name: "待收货",
					icon: "../../static/mine/daishouhuo.png"
				  }
				],
				//   个人信息
				personMsgList: [{
					name: "地址管理",
					icon: "../../static/mine/dizhiguanli.png"
				  },
				  {
					name: "我的钱包",
					icon: "../../static/mine/zu.png",
					remaBala: "200余额"
				  },
				  {
					name: "我的优惠券",
					icon: "../../static/mine/wodeyouhuiquan.png",
				  },
				  {
					name: "我的二维码",
					icon: "../../static/mine/wodeerweima.png",
				  },
				  {
					name: "我的小伙伴",
					icon: "../../static/mine/xiaohuoban.png"
				  }
				],
			}
		},
		mounted() {
			// this._userInfo();
			
		},
		onShow(){
			// 判断用户是否登录
			if(!app.globalData.uid){
				console.log(app.globalData.uid,'1')
				tool._showToast({
					title:"请 先登录",
					icon:'loading'
				})
				setTimeout(()=>{
					uni.navigateTo({
						url:'../send/send'
					})
				},2000);
			}else{
				this._userInfo();
			}
		},
		methods:{
			// 跳转订单列表
			_goToList(index){
				if(index == 0){
					uni.navigateTo({
						url:'/pages/order/order'
					})
				}
			},
			
			// 处理用户数据
			_userInfo(){
				const userInfo = tool._getStorage("userInfo");
				// 手机号加*号
				let reg=/(\d{3})\d{4}(\d{4})/;
				userInfo.phone = userInfo.phone.replace(reg, "$1****$2");
				this.userInfo = userInfo;
			}
		},
		onLoad() {
			
		}
	}
</script>

<style>
	@import url("../../common/css/mine.css");
</style>
