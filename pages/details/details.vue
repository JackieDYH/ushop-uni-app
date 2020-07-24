<template>
	<view class="container">
		<!-- 详情图片 -->
		<view class="detailImage">
			<image :src="product.src">
		</view>
		<!-- 详情基本信息 -->
		<view class="detailInfo">
			<view class="detailInfoName">
				<label>{{product.name}}</label>
			</view>
			<view class="detailInfoPrice">
				<label style="color: red;">￥ {{product.price}}</label>
				<label style="font-size: 24rpx;color: #ccc;">(此价格不与套装优惠同时享受)</label>
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
				  <label class="zhi">{{product.num}}</label>
				  <label @click="add()" class="jia">+</label>
				</view>
			</view>
			<!-- 商品属性 -->
			<view class="changeState">
				<view class="productStat">
					<label for="">商品属性</label>
				</view>
				<view class="productGuige">
					<label>规格</label>
					<view class="threed3i1">30g</view>
					<view class="threed3i2">5g</view>
				</view>
			</view>
		</view>
		<!-- 商品详情 -->
		 <view class="productDetail">
			<view class="productDetailTitle">商品详情</view>
			<!-- 需要处理图片自适应问题 -->
			<image :src="productDetailImage.detailImage" @load="autoImage" :style="{width:autoWidth+'px',height:autoHeight+'px'}" />
		</view>
		
		<view class="productEval">
			<view class="eval">商品评价</view>
			<view v-for="(item,index) in evals" :key="index">
				<label class="evalUsername">{{item.name}}</label>
				<label class="evalUsertitle">{{item.title}}</label>					
				<view class="evalImage">
					<image v-for="(i,ind) in item.img" :key="ind" :src="i">
				</view>
				<label class="evalTime">{{item.time}}</label>
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
	export default {
		data() {
			return {
				product:{},
				productDetailImage:{
					detailImage:"../../static/detail/2.jpg"
				},
				// 设置自适应宽高
				autoWidth:"",
				autoHeight:"",
				evals: [{  //评价内容
					name: '小李白',
					title: '效果很好，物流到位，下次继续来',
					img: ["../../static/detail/pingjia1.jpg","../../static/detail/pingjia1.jpg","../../static/detail/pingjia1.jpg","../../static/detail/pingjia1.jpg","../../static/detail/pingjia2.jpg","../../static/detail/pingjia3.jpg"],
					time: '2020-01-13'
				}]
			}
		},
		methods: {
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
				// 判断本地购物车是否有该商品
				try {
				    const carts = uni.getStorageSync('carts') || [];
				   
					//直接判断当前商品是否在当前的carts中
					// [{},{}]
					let  index = carts.findIndex((item,index)=>{
						return  item.id == this.product.id;
					})
					 // console.log(index,this.product)
					if(index == -1){
						//证明没有该商品，直接插入
						this.product.check = true; //临时设置一个被选中的状态
						carts.push(this.product)
					}else{
						//有商品，直接修改数量即可
						carts[index].num = this.product.num; //购物车里面的数量修改为新的数量
					}
					
					uni.setStorage({
					    key: 'carts',
					    data: carts,
					    success: function (res) {
					        if(res.errMsg == "setStorage:ok"){
								uni.showToast({
								    title: '添加成功',
								    duration: 2000
								});
							}
					    }
					});
				} catch (e) {
				    // error
					console.log(e)
				}
			},
		},
		onLoad: function (option) {
			// 获取当前商品信息
		    const product = JSON.parse(decodeURIComponent(option.product));
			// console.log(product)
			this.product = product;
		}
	}
</script>

<style>
	@import url("../../common/css/details.css");
</style>
