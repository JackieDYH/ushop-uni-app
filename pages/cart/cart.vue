<template>
	<view class="container">
		<view class="top">
			<scroll-view class="scroll-view_H" scroll-x="true" :scroll-left="0" >
				<view class="cartInfo" id="demo1">
					<!-- 明日来写购物车基本信息 -->
					<view class="cartInfochild">
						<!-- 选择框 -->
						<view class="cartInfo_switch common">
							<!-- 点击当前商品 -->
							 <switch  type="checkbox" />
						</view>
						<!-- 图片 -->
						<view class="cartInfo_image common">
							<image src="/static/index/goods.jpg" mode=""></image>
						</view>
						
						<!-- 信息 -->
						<view class="cartInfo_info">
							<label for="" style="font-size: 26rpx;">华为</label>
							<label for="" style="font-size: 24rpx; color: #ccc;">规格：白色</label>
							<label for="" style="color: red;">￥40</label>
						</view>
						<!-- 加减数量 -->
						<view class="cartInfo_num">
							<view class="cartInfo_num_child">
								<label for="">-</label>
								<label for="">1</label>
								<label for="">+</label>
							</view>						
						</view>
					</view>
					
				</view>
				<view class="cartDel" id="demo2">
					<label for="" >删除</label>
				</view>			
			</scroll-view>
		</view>
		
		<!-- 底部 -->
		<view class="foot">
			<view class="footd1">
				<switch   type="checkbox" />
				<label>全选</label>
			</view>
			<view class="footd2">
				<view class="footd2sp1">总计：<label style="color: red;">1000</label></view>
				<label class="footd2sp2">不含运费，已优惠￥0.00</label>
			</view>
			<!-- 跳到提交订单，结算页面 -->
			<view class="footd3" @click="confirm">
				<!-- 被选中的商品的个数 -->
				<label>去结算(2件)</label>
			</view>
		</view>
		<image src="/static/kk.jpg" mode="widthFix"></image>	
	</view>
	
</template>

<script>
	import api from '../../utils/api/login.js';
	import tool from '../../utils/tool.js';
	
	const app = getApp();
	
	export default {
		data(){
			return {
				carts:[
					{
						name:'华为mate40',
						price:5000,
						num:3				
						
					},
					{
						name:'华为mate30',
						price:4000,
						num:2
					}
				]
			}
		},
		mounted() {
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
			}
		},
		methods:{
			
			
			
		},
	}
</script>

<style>
	@import url("../../common/css/cart.css");
	.cartInfo_image_img{
		width: 120rpx;
		height: 120rpx;
	}
	.foot{
		bottom: var(--window-bottom)
	}
</style>