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
				  <label @click="down" class="jian">-</label>
				  <label class="zhi">{{nums}}</label>
				  <label @click="add" class="jia">+</label>
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
			<view class="text" v-html="goodInfo.description"></view>
			<!-- 富文本显示 二者都可以 -->
			<!-- <rich-text :nodes="goodInfo.description"></rich-text> -->
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
			<!-- <image style="width: 100rpx;height: auto;background-color: #eee;" src="../../static/tabBar/Agouwuchekong.png" mode="widthFix"></image> -->
			<button class="footbtn1" @click="_addCart">加入购物车</button>
			<button class="footbtn2" @click="storage">立即购买</button>
		</view>
	</view>
</template>

<script>
	// 导入图片自适应工具类
	let actionimage = require('../../utils/ActionImage.js');
	
	import api from '../../utils/api/details.js';
	import api1 from '../../utils/api/login.js';
	
	import config from '../../utils/config.js';
	import tool from '../../utils/tool.js';
	
	let app =getApp();//获取app实例
	
	export default {
		data() {
			return {
				goodInfo:[],//商品详情
				specsattr:[],//商品属性列表
				specsIndex:0,//属性列表下标
				nums:1,//商品数量
				
				
				product:{},
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
					
					// 格式化商品属性 specsattr 改变原数据
					// this.goodInfo.specsattr = this.goodInfo.specsattr.split(',');
					this.specsattr = this.goodInfo.specsattr.split(',');
					// console.log(this.specsattr)
					tool._hideLoading();
				}catch(err){
					tool._hideLoading();
					console.log(err,'详情获取错误')
				}
			},
			
			// 加入购物车
			async _addCart(){
				// 获取token 判断用户登录是否过期
				const token = app.globalData.authorization;
				if(!token){
					tool._showToast({
						title:'请先登录...',
						icon:"loading"
					});
					setTimeout(()=>{
						uni.navigateTo({
							url:'../send/send'
						})
					},2000)
					return;
				}
				
				/*
				post请求
				 参数名说明uid用户编号，
				 必填项goodsid商品编号，
				 必填项num数量，
				 必填项authorization  header头中需要添加token后台验证条件
				 */
				const { uid,authorization } = app.globalData;
				// 处理属性数据
				const attribute = this.goodInfo.specsname +','+ this.specsattr[this.specsIndex];
				try{
					const addRes = await api1._addCart({
						data:{
							uid,
							goodsid:this.goodInfo.id,
							attribute,
							num:this.nums
						},
						token:authorization
					})
					
					console.log(addRes,'添加购物车成功')
					if(addRes.data.code == 200){
						tool._showToast({
							title:addRes.data.msg,
							icon:'success'
						})
						setTimeout(()=>{
							uni.switchTab({
								url:'../cart/cart'
							})
						},2000)
					}else{
						tool._showToast({
							title:addRes.data.msg,
							icon:'loading'
						})
					}
					
					
				}catch(err){
					console.log(err,'添加到购物车出错')
				}
				
				
			},
			
			
			
			// 购买数量减少
			down(){
				if (this.nums <= 1) {
				  this.nums = 1;
				  tool._showToast({title:'数量不能小于1'});
				} else {
				  this.nums--;
				}
			},
			// 购买数量添加
			add(){
				this.nums++;
			},
			
			//处理图片自适应方法
			autoImage(e){
				// 调用图片自适应工具类方法，进行处理图片
				let auto  = actionimage.default(e)
				this.autoHeight = auto.autoHeight;
				this.autoWidth = auto.autoWidth;
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
