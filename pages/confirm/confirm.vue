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
			<view class="cartsInfo" v-for="(item,index) in carts" :key="item.id">
				<!-- 70px -->
				<view class="carts_detail">
					<view class="carts_image">
						<image :src="item.img" mode=""></image>
					</view>
					<view class="carts_name">
						<view for="" style="font-size: 30rpx;">{{item.goodsname}}</view>
						<view for="" style="font-size: 26rpx; color: #C0C0C0;">{{item.attribute[0]}}:{{ item.attribute[1] }}</view>
					</view>
					<view class="carts_price">
						<label for="">￥ {{item.price}}</label>
					</view>
				</view>
				<!-- 50px -->
				<view class="cart_num">
					<view class="">
						购买数量：
					</view>
					<view class="">
						<label for="" class="jian" @click="_down(index)">-</label>
						<label for="" class="num">{{item.num}}</label>
						<label for="" class="jia" @click="_add(index)">+</label>
					</view>
				</view>
				<!-- 横线 -->
				<view class="xian"></view>
			</view>			
			
			<!-- 50px -->
			<view class="kuaidi">
				<label for="">配送方式</label>
				<label for="">小码快递</label>
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
				<label for="" style="margin-right:40rpx;color:red">￥{{_setAllPrice}}</label>
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
			实付金额：<label for="" style="color:red">￥{{_setAllPrice}}</label>
		</view>
		
		<!-- 确认订单按钮 -->
		<view class="btn">
			<!-- 点击提交订单按钮，发起支付请求 -->
			<button type="primary" @click="_addOrders">提交订单</button>
		</view>
	</view>
</template>

<script>
	import api from '../../utils/api/login.js';
	import tool from '../../utils/tool.js';
	
	const { uid,authorization } = getApp().globalData;
	
	export default {
		data() {
			return {
				carts:[],//当前自己购买的商品
				information: {
					name: 'Jackie',
					phone: '13014039091',
					address: '安徽省海淀区隐泉路清林苑6号楼中公优就业总部3层'
				}
			}
		},
		computed:{
			//总价格
			_setAllPrice(){
				let price = 0
				this.carts.forEach(item=>{
					 price += item.num  * item.price 
				})
				///如果有积分和优惠券，那么在此处进行处理。
				return price
			},
			//总数量
			_setAllNums(){
				let nums = 0
				this.carts.forEach(item=>{
					 nums += item.num
				})
				return nums
			},
		},
		onLoad(){
			this._getStorageCarts()
		},
		methods: {
			
			//累加
			_add(index){
				this.carts[index].num++
			},
			//递减
			_down(index){
				//console.log( this.carts[index] )
				this.carts[index].num--
				if( this.carts[index].num <=0 ){
					this.carts[index].num = 1
				}
			},
			
			//从缓存中获取要购买的商品
			_getStorageCarts(){
					this.carts = uni.getStorageSync('carts') || []
			},
			
			async _addOrders(){
				/* 
				 参数名说明
				 uid会员id
				 username收货人姓名
				 userphone收货人联系方式
				 address收货人地址
				 countmoney订单总支付金额
				 countnumber订单商品数量
				 addtime订单添加时间（时间戳）
				 idstr购物车数据id字符串 例如：idstr = "1,2,3"
				 authorizationheader头中需要添加token后台验证条件
				 
				 uid username userphone address countmoney countnumer addtime -> 封装到params中 以json字符串的形式传递过去，不是真正对象
				 */
				let username,userphone,address,countmoney,countnumber, addtime,idstr='';
				// uid = tool._getStorage('userInfo').uid;
				username = this.information.name;
				userphone = this.information.phone;
				address = this.information.address;
				countmoney = this._setAllPrice ;
				countnumber = this._setAllNums;
				addtime = new Date();
				let params = {
					uid,
					username,
					userphone,
					address,
					countmoney,
					countnumber,
					addtime
				}
				console.log( params )
				this.carts.forEach(item=>{
					//console.log(item.id)
					idstr+=item.id + ','
				})
				idstr =	idstr.substring( 0,idstr.length-1 )
				console.log( idstr )
				const data={
					params:JSON.stringify(params),
					idstr
				}
				console.log(data,222222)
				
				// 添加购物车
				const addRes = await api._addOrders({data,token:authorization});
				console.log(addRes,333)
				if(addRes.data.code == 200){
					tool._showToast({title:addRes.data.msg});
					setTimeout(()=>{
						uni.switchTab({
							url:'../mine/mine'
						})
					},2000);
				}
				
				// tool._showToast({title:"支付完成"});
				
			}
		}
	}
</script>

<style>
	@import url("../../common/css/confirm.css");
</style>
