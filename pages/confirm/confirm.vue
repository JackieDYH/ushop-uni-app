<template>
	<view class="container">
		<!-- s收货地址 -->
		<view class="address">
			<view class="address_info">
				<label for="">收件人:{{ information.name }}</label>	
				<label for="">{{ information.phone }}</label>
			</view>
			<view class="address_res">
				收货地址：<label for="">{{ information.address }}</label>
			</view>
		</view>
		
		<!-- 商品信息 -->
		<view class="carts">
			<view class="cartsInfo" v-for="(cart,ind) in carts" :key="ind">
				<!-- 70px -->
				<view class="carts_detail">
					<view class="carts_image">
						<image :src="cart.src" mode=""></image>
					</view>
					<view class="carts_name">
						<view for="" style="font-size: 30rpx;">{{ cart.name }}</view>
						<view for="" style="font-size: 26rpx; color: #C0C0C0;">规格:{{ cart.tol }}</view>
					</view>
					<view class="carts_price">
						<label for="">￥ {{ cart.price }}</label>
					</view>
				</view>
				<!-- 50px -->
				<view class="cart_num">
					<view class="">
						购买数量：
					</view>
					<view class="">
						<label for="" class="jian" @click="dux(ind)">-</label>
						<label for="" class="num">{{ cart.num }}</label>
						<label for="" class="jia" @click="add(ind)">+</label>
					</view>
				</view>
				<!-- 横线 -->
				<view class="xian"></view>
			</view>			
			<!-- 50px -->
			<view class="kuaidi">
				<label for="">配送方式</label>
				<label for="">XX快递</label>
			</view>
		</view>
		
		<!-- 优惠券 -->
		<view class="yhquan">
			<label for="">优惠券</label>
			<label for="" style="margin-right: 40rpx;">无可用</label>
		</view>
		<!-- jifen积分 -->
		<view class="jifen">
			<view class="use" >
				<label for="">使用积分</label>
			</view>
			<view class="input" style="margin-right: 40rpx;">
				<input type="text" value="" placeholder="输入积分"/>
				<label for="" class="input_use">使用</label>
				<label for="" class="input_keyi">可使用50积分</label>
			</view>
		</view>
		
		<!-- 具体详细 -->
		<view class="resDetail">
			<view class="">
				<label for="">商品金额</label>
				<label for="" style="margin-right:40rpx;color:red">￥{{allPrice}}</label>
			</view>
			<view class="">
				<label for="">运费</label>
				<label for="" style="margin-right:40rpx;color:red">+￥0.00</label>
			</view>
			<view class="">
				<label for="">优惠券</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
			<view class="">
				<label for="">会员优惠</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
			<view class="">
				<label for="">积分抵扣</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
		</view>
		<!-- 实付金额 -->
		<view class="sfje">
			实付金额：<label for="" style="color:red">￥{{ allPrice }}</label>
		</view>
		
		<!-- 确认订单按钮 -->
		<view class="btn">
			<!-- 点击提交订单按钮，发起支付请求 -->
			<button type="primary" @click="pay">提交订单</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				carts:[],//当前自己购买的商品
				allPrice:0,//商品金额
				// countPrice:0,//实付金额
				information: {
					name: 'YouSu',
					phone: '18240279221',
					address: '北京市海淀区隐泉路清林苑6号楼中公优就业总部3层'
				}
			}
		},
		methods: {
			// 数量添加
			add(index){						
				this.carts[index].num++;		
				//计算选中的总价
				let  allPrice = 0;
				this.carts.map((item,index)=>{
					allPrice += parseFloat(item.price) * parseFloat(item.num)
				})
				this.allPrice = allPrice;
				//当前选中的商品数量修改了，还不能直接把carts存回，这样会覆盖		
				
				// 获取所有的购物车信息
				let  allCarts = uni.getStorageSync('carts') ||  [];
				let updateCart = this.carts[index];//修改的商品
				//找到修改商品的索引
				let updateIndex = allCarts.findIndex((item,index)=>{
					return item.id == updateCart.id;
				})
				
				allCarts[updateIndex].num++;
				
				//直接将allcarts存回缓存中
				uni.setStorageSync('carts',allCarts)
				
			},
			// 数量减少
			dux(index){
				// console.log(index)
				if (this.carts[index].num <= 1) {
					this.carts[index].num = 1;
					
					return false;
				} else {
					this.carts[index].num--
				}
				//计算选中的总价
				let  allPrice = 0;
				this.carts.map((item,index)=>{
					allPrice += parseFloat(item.price) * parseFloat(item.num)
				})
				this.allPrice = allPrice;
				
				// 获取所有的购物车信息
				let  allCarts = uni.getStorageSync('carts') ||  [];
				let updateCart = this.carts[index];//修改的商品
				//找到修改商品的索引
				let updateIndex = allCarts.findIndex((item,index)=>{
					return item.id == updateCart.id;
				})
				
				allCarts[updateIndex].num--;
				
				//直接将allcarts存回缓存中
				uni.setStorageSync('carts',allCarts)
				
			},
			
			//支付请求
			pay(){
				uni.showToast({
					title:"正在发起支付",
					icon:"none"
				})
			}
		},
		onLoad() {
			//获取购物车里面所有的商品
			let  that =this;
			uni.getStorage({
				key : 'carts',
				success:function(res){
					// console.log(res.data)
					// 获取被选中的商品
					let checkData = res.data.filter((item,index)=>{
						return item.check == true;
					})
					
					//计算商品价格
					let  allPrice = 0;
					checkData.map((item,index)=>{
						allPrice += parseFloat(item.price) * parseFloat(item.num)
					})
					that.allPrice = allPrice;
					that.carts = checkData;
				}
			})
			
			
		}
	}
</script>

<style>
	@import url("../../common/css/confirm.css");
</style>
