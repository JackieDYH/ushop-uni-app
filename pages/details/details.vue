<template>
	<view class="container">
		<!-- 详情图片 -->
		<view class="detailImage">
			<image :src="goodInfo.img">
		</view>
		<!-- 详情基本信息 -->
		<view class="detailInfo">
			<view class="detailInfoName">
				<label>{{goodInfo.goodsname}}</label>
			</view>
			<view class="detailInfoPrice">
				<label style="color: red;">￥ {{goodInfo.price}}</label>
				<label style="font-size: 24rpx;color: #ccc;"> (此价格不与套装优惠同时享受)</label>
			</view>			
		</view>
		
		<!-- 基本信息改变 -->
		<view class="changeInfo">
			<view class="youhui">
				<view>促销：<label class="manjian">满减</label><label class="dazhe">满2件9折；3件8折</label></view>
			</view>
			<!-- 数量加减 -->
			<view class="changeNum">
				<view class="num">购买数量</view>
				<view class="action">
				  <label @click="dux()" class="jian">-</label>
				  <label class="zhi">10</label>
				  <label @click="add()" class="jia">+</label>
				</view>
			</view>
			<!-- 商品属性 -->
			<view class="changeState">
				<view class="productStat">
					<label for="">商品属性</label>
				</view>
				<view class="productGuige">
					<label>{{goodInfo.specsname}}</label>
					<view class="threed3i1" :class="specsIndex == index ? 'specsactive' : '' " v-for="(item,index) in specsattr" :key="index" @click="_specsIndex(index)">{{item}}</view>
				</view>
			</view>
		</view>
		<!-- 商品详情 -->
		 <view class="productDetail">
			<view class="productDetailTitle">商品详情</view>
			<!-- 需要处理图片自适应问题 -->
			<!-- <image :src="productDetailImage.detailImage" @load="autoImage" :style="{width:autoWidth+'px',height:autoHeight+'px'}" /> -->
			<view class="text" v-html="goodInfo.description"></view>
		</view>
		
		<view class="productEval">
			<view class="eval">商品评价</view>
			<view>
				<label class="evalUsername">阿豪</label>
				<label class="evalUsertitle">质量很不错，我很喜欢</label>					
				<view class="evalImage">
					<image :src="goodInfo.img">
				</view>
				<label class="evalTime">2020-01-13</label>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="foot">
			<button class="footbtn1" @click="storage">加入购物车</button>
			<button class="footbtn2" @click="storage">立即购买</button>
		</view>
	</view>
</template>

<script>
	// 导入图片自适应工具类
	let actionimage = require('../../utils/ActionImage.js');
	
	import api from '../../utils/api/details.js';
	import config from '../../utils/config.js';
	import tool from '../../utils/tool.js';
	
	
	export default {
		data() {
			return {
				goodInfo:[],//商品详情
				specsattr:[],//商品属性列表
				specsIndex:0,//属性列表下标
				
				
				product:{},
				productDetailImage:{
					detailImage:"../../static/detail/2.jpg"
				},
				// 设置自适应宽高
				autoWidth:"",
				autoHeight:"",
			}
		},
		mounted(){
			// console.log(this.$mp,2222)
			tool._showLoading();
			// 商品id
			const {id} = this.$mp.query;
			this._getgoodsinfo(id);
			
		},
		methods: {
			// 属性下标改变
			_specsIndex(index){
				this.specsIndex = index;
			},
			
			// 获取商品详情信息
			async _getgoodsinfo(id){
				try{
					const goodInfoRes = await api._getgoodsinfo(id);
					goodInfoRes.data.list[0].img = config.apiurl + goodInfoRes.data.list[0].img;
					this.goodInfo = goodInfoRes.data.list[0];
					console.log(this.goodInfo,'goodInfo')
					
					// 格式化商品属性 specsattr
					this.specsattr = this.goodInfo.specsattr.split(',');
					// console.log(this.specsattr)
					tool._hideLoading();
				}catch(err){
					tool._hideLoading();
					console.log(err,'详情获取错误')
				}
			},
			
			
			
			
			//处理图片自适应方法
			autoImage(e){
				// 调用图片自适应工具类方法，进行处理图片
				let auto  = actionimage.default(e)
				this.autoHeight = auto.autoHeight;
				this.autoWidth = auto.autoWidth;
			},
			// 购买数量减少
			dux(){
				if (this.product.num <= 1) {
				  this.product.num = 1
				} else {
				  this.product.num--
				}
			},
			// 购买数量添加
			add(){
				this.product.num++;
			},
			 // 点击加入购物车本地存储
			storage() {
				// // 判断本地购物车是否有该商品
				// try {
				//     const carts = uni.getStorageSync('carts') || [];
				   
				// 	//直接判断当前商品是否在当前的carts中
				// 	// [{},{}]
				// 	let  index = carts.findIndex((item,index)=>{
				// 		return  item.id == this.product.id;
				// 	})
				// 	 // console.log(index,this.product)
				// 	if(index == -1){
				// 		//证明没有该商品，直接插入
				// 		this.product.check = true; //临时设置一个被选中的状态
				// 		carts.push(this.product)
				// 	}else{
				// 		//有商品，直接修改数量即可
				// 		carts[index].num = this.product.num; //购物车里面的数量修改为新的数量
				// 	}
					
				// 	uni.setStorage({
				// 	    key: 'carts',
				// 	    data: carts,
				// 	    success: function (res) {
				// 	        if(res.errMsg == "setStorage:ok"){
				// 				uni.showToast({
				// 				    title: '添加成功',
				// 				    duration: 2000
				// 				});
				// 			}
				// 	    }
				// 	});
				// } catch (e) {
				//     // error
				// 	console.log(e)
				// }
			},
		},
		// onLoad: function (option) {
		// 	// 获取当前商品信息
		//     const product = JSON.parse(decodeURIComponent(option.product));
		// 	// console.log(product)
		// 	this.product = product;
		// }
	}
</script>

<style>
	@import url("../../common/css/details.css");
</style>
