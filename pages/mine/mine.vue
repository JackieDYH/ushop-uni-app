<template>
	<view class="container">
		<!-- 顶部头像部分 -->
		<view class="mineTop">
			<view class="mineTop_left">
				<view class="mineTop_left_image">
					<image src="../../static/mine/timg.jpg" mode=""></image>
				</view>
				<view class="mineTop_left_info">
					<label for="" style="color: #fff;">{{userInfo.nickname}}</label>
					<label for="">{{userInfo.phone}}</label>
				</view>		
			</view>
			<view class="mineTop_right">
				<view class="mineTop_right_info">
					<label for="">每日签到</label>
				</view>
			</view>
		</view>
		
		<!-- 订单状态 -->
		<view class="order_state">
			<view class="order_state_list" v-for="(list,ind) in orderList" :key="ind">
				<image :src="list.icon" mode=""></image>
				<lable class="list_text">{{ list.name }}</lable>
			</view>
		</view>
		
		<!-- 个人信息 -->
		<view class="person_msg">
			<view class="person_msg_list" v-for="(item,ind) in personMsgList" :key="ind">
				<view class="person_msg_list_info">
					<image :src="item.icon" alt class="MsgItemLogo" />
					<label>{{item.name}}</label>
				</view>	
				<view class="MsgItemRight">
				   <label class="remaB" v-show="item.remaBala">200余额</label>
				   <image src="../../static/mine/xiayiye.png" alt class="MsgItemDetail" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tool from '../../utils/tool.js';
	
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
			this._userInfo();
		},
		methods:{
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
