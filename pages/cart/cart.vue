<template>
	<view class="container">
		<view class="top">
			<scroll-view class="scroll-view_H" scroll-x="true" :scroll-left="scrollLeft" v-for="(cart,ind) in carts" :key="ind">
				<view class="cartInfo" id="demo1">
					<!-- 明日来写购物车基本信息 -->
					<view class="cartInfochild">
						<!-- 选择框 -->
						<view class="cartInfo_switch common">
							<!-- 点击当前商品 -->
							 <switch  type="checkbox" :checked="cart.check"  @change="checkone" :data-ind="ind"/>
						</view>
						<!-- 图片 -->
						<view class="cartInfo_image common">
							<image :src="cart.src" mode=""></image>
						</view>
						
						<!-- 信息 -->
						<view class="cartInfo_info">
							<label for="" style="font-size: 26rpx;">{{ cart.name }}</label>
							<label for="" style="font-size: 24rpx; color: #ccc;">规格：{{ cart.tol }}</label>
							<label for="" style="color: red;">￥{{ cart.price }}</label>
						</view>
						<!-- 加减数量 -->
						<view class="cartInfo_num">
							<view class="cartInfo_num_child">
								<label for="" @click="dux(ind)">-</label>
								<label for="">{{ cart.num }}</label>
								<label for="" @click="add(ind)">+</label>
							</view>						
						</view>
					</view>
					
				</view>
				<view class="cartDel" id="demo2">
					<label for="" @click="delCart(ind)">删除</label>
				</view>			
			</scroll-view>
		</view>
		
		<!-- 底部 -->
		<view class="foot">
			<view class="footd1">
				<switch   type="checkbox" :checked="isCheckall" @change="checkAll" />
				<label>全选</label>
			</view>
			<view class="footd2">
				<view class="footd2sp1">总计：<label style="color: red;">{{ allPrice }}</label></view>
				<label class="footd2sp2">不含运费，已优惠￥0.00</label>
			</view>
			<!-- 跳到提交订单，结算页面 -->
			<view class="footd3" @click="confirm">
				<!-- 被选中的商品的个数 -->
				<label>去结算({{comNum}}件)</label>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data(){
			return {
				carts:[],//购物车内的信息
				isCheckall:false,// 用来控制是否全选的
				allPrice:0, //总价钱
				comNum:0,//购买商品的数量
				scrollLeft:0,//默认横向滚动 0
			}
		},
		methods:{
			// 选中一个
			checkone(e){
				// console.log(e)
				// 获取当前选中的索引
				let  ind = e.currentTarget.dataset.ind;
				// 改变当前carts中的check属性
				this.carts[ind].check = e.detail.value;
				// 主要是改变购物车内当前数据的check属性(把更新之后的数据统一存回去)
				uni.setStorageSync('carts',this.carts);
				// 检测
				this.isCheckAll();
				//计算选中的总价
				this.countAllprice();
			},
			// 全选按钮
			checkAll(e){
				//true 就是全选，false就是全不选
				this.carts.map((item,index)=>{
					 this.carts[index].check = e.detail.value
				})	
				
				uni.setStorageSync('carts',this.carts);	
				//计算选中的总价
				this.countAllprice();
			},
			//检测是否全选方法
			isCheckAll(){
				// 还有判断一下是否全部被选中
				let index =  this.carts.findIndex((item,index)=>{
					return item.check ==  false; //有没被选中的
				})
				//返回-1 。证明没有false，也就是全部被选中的状态
				if(index == -1){
					this.isCheckall = true;
				}else{
					this.isCheckall = false;
				}
			},
			// 计算总价钱
			countAllprice(){
				//获取所有被选中的商品
				let  checkData = this.carts.filter((item,index)=>{
					return item.check == true;
				})
				
				//循环进行累加即可
				let  allPrice = 0;
				checkData.map((item,index)=>{
					allPrice += parseFloat(item.price) * parseFloat(item.num);
				})
				
				this.allPrice = allPrice;
				this.comNum = checkData.length;
			},
			// 数量添加
			add(index){
				this.carts[index].num++;
				uni.setStorageSync('carts',this.carts);	
				//计算选中的总价
				this.countAllprice();
			},
			// 数量减少
			dux(index){
				if (this.carts[index].num <= 1) {
					this.carts[index].num = 1
				} else {
					this.carts[index].num--
				}
				uni.setStorageSync('carts',this.carts);						
				//计算选中的总价
				this.countAllprice();
			},
			
			// 跳转确认订单页面
			confirm(){
				uni.navigateTo({
					url:"/pages/confirm/confirm"
				})
			},
			
			// 删除指定的商品
			delCart(index){
				// console.log(index)
				// 当前carts中索引与缓存中carts中的索引正好一致
				// 获取所有的购物车信息
				let  allCarts = uni.getStorageSync('carts') ||  [];
				
				allCarts.splice(index, 1)
				
				this.carts = allCarts;
				//直接将allcarts存回缓存中
				uni.setStorageSync('carts',allCarts);
				//计算选中的总价
				this.countAllprice();
				// 检测是否全选
				this.isCheckAll();
				
				//删除成功之后，直接将所的scroll-view元素，右侧变为0
				this.scrollLeft = 1;
			
			}
		},
		onLoad() {
			
		},
		// 页面显示时
		onShow(){
			//页面显示时，去加载购物车信息
			try{
				let carts =  uni.getStorageSync('carts');
				
				this.carts = carts;
				
				// 检测是否全选
				this.isCheckAll();
				//计算选中的总价
				this.countAllprice();
				// console.log(carts)
			}catch(e){
				//TODO handle the exception
				console.log('购物车缓存获取失败！！原因：'+e.message)
			}
			
			
		}
	}
</script>

<style>
	@import url("../../common/css/cart.css");
	.cartInfo_image_img{
		width: 120rpx;
		height: 120rpx;
	}
</style>
