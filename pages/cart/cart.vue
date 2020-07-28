<template>
	<view class="container">
		<view class="top" v-if="carts.length > 0">
			<scroll-view class="scroll-view_H" scroll-x="true" :scroll-left="0" v-for="(item,index) in carts" >
				<view class="cartInfo" id="demo1">
					<!-- 明日来写购物车基本信息 -->
					<view class="cartInfochild">
						<!-- 选择框 -->
						<view class="cartInfo_switch common">
							<!-- 点击当前商品 -->
							 <switch  type="checkbox" :checked="item.checked" @change="_setChecked($event,index)" />
						</view>
						<!-- 图片 -->
						<view class="cartInfo_image common" @click="_goTodetails(item.goodsid)">
							<image :src="item.img" mode=""></image>
						</view>
						
						<!-- 信息 -->
						<view class="cartInfo_info">
							<label for="" style="font-size: 26rpx;">{{item.goodsname}}</label>
							<label for="" style="font-size: 24rpx; color: #ccc;">{{item.attribute[0]}}：{{item.attribute[1]}}</label>
							<label for="" style="color: red;">￥{{item.price}}</label>
						</view>
						<!-- 加减数量 -->
						<view class="cartInfo_num">
							<view class="cartInfo_num_child">
								<label for="" @click="down(index)">-</label>
								<label for="">{{item.num}}</label>
								<label for="" @click="add(index)">+</label>
							</view>						
						</view>
					</view>
					
				</view>
				<view class="cartDel" id="demo2">
					<label for="" @click="_cartDelete(item.id,index)">删除</label>
				</view>			
			</scroll-view>
		</view>
		
		<image style="padding-top: 100rpx;" src="/static/kk.jpg" mode="widthFix" v-else></image>
		
		<!-- 底部 -->
		<view class="foot">
			<view class="footd1">
				<switch   type="checkbox" :checked="_setIsAllChecked" @change="_setEveryChecked($event)" />
				<label>全选</label>
			</view>
			<view class="footd2">
				<view class="footd2sp1">总计：<label style="color: red;">{{_setAllPrice}}</label></view>
				<label class="footd2sp2">不含运费，已优惠￥0.00</label>
			</view>
			<!-- 跳到提交订单，结算页面 -->
			<view class="footd3" @click="_goToConfirm">
				<!-- 被选中的商品的个数 -->
				<label>去结算({{_setAllNums}}件)</label>
			</view>
		</view>
	</view>
	
</template>

<script>
	import api from '../../utils/api/login.js';
	import config from '../../utils/config.js';
	import tool from '../../utils/tool.js';
	
	// const app = getApp();
	// const { uid,authorization } = app.globalData;
	let { uid,token } = tool._getStorage("userInfo");
	let authorization = token;
	
	export default {
		data(){
			return {
				carts:[],//购物车列表
						//购物车的数据比较复杂，用计算属性是最简单的。
				//isAllChecked:false,//是否全选
				//totalNums:1,//要购买的总数量
				//totalPrice:0,//购物车商品的总价格
			}
		},
		onShow(){
			this._getCartList();
		},
		computed:{
			// 计算总价格
			_setAllPrice(){
				let price = 0;
				this.carts.forEach((item=>{
					item.checked ? price += item.num * item.price : null;
				}))
				return price +'元';
			},
			
			// 总数量
			_setAllNums(){
				let nums = 0;
				this.carts.forEach(item=>{
					item.checked ? nums += item.num : null;
				})
				return nums;
			},
			
			// 是否全选
			_setIsAllChecked(){
				return this.carts.length > 0 ? this.carts.every(item=>item.checked) : false;
			}
			
		},
		mounted() {
			// 判断用户是否登录
			if(!uid){
				console.log(uid,'1')
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
				this._getCartList();
			}
		},
		methods:{
			// 商品跳转详情
			_goTodetails(id){
				uni.navigateTo({
					url:`../details/details?id=${id}`
				})
			},
			
			//根据全选的状态，设置每一个数据的状态
			_setEveryChecked(e){
				let checked = e.detail.value;
				this.carts.forEach((item,index)=>{
					item.checked = checked;
					
					this._setCartEdit(index);
				})
				
			},
			
			//设置当前索引数据的选中状态
			_setChecked(e,index){
				this.carts[index].checked = e.detail.value;
				
				this._setCartEdit(index);
			},
			
			//加
			add(index){
				this.carts[index].num++;
				
				this._setCartEdit(index);
			},
			//减
			down(index){
				this.carts[index].num--;
				if(this.carts[index].num <=0){
					tool._showToast({title:"数量 不能小于1"})
					this.carts[index].num = 1;
				}
				
				this._setCartEdit(index);
			},
			
			//调用修改购物车接口，达到数据永久化
			async _setCartEdit(index){
				let { num,checked,id } = this.carts[index];
				checked = checked ? 1 : 0;
				let editRes = await api._setCartEdit({
					data:{id,num,checked},
					token:authorization
				})
				console.log(editRes,'editRes')
			},
			
			//筛选数据，然后跳转到confirm
			_goToConfirm(){
				let expectedProduct = this.carts.filter(item=>{
					return item.checked;
				})
				console.log(expectedProduct,'expectedProduct')
				if(expectedProduct.length == 0){
					tool._showToast({title:"请选中商品"})
					return false;
				}
				// 存储到本地
				tool._setStorage('carts',expectedProduct);
				
				uni.navigateTo({
					url:'../confirm/confirm'
				})
			},
			
			//删除购物车中的商品
			async _cartDelete(id,index){
				const del = await tool._showModal();
				console.log(del)
				if(del.confirm){
					const delInfo = await api._cartDelete({
						data:{id},
						token:authorization
					})
					console.log(delInfo,'del')
					this.carts.splice(index,1);
				}
				
			},
			
			// 获取购物车数据
			async _getCartList(){
				// console.log( uid,authorization,'getCartList' )
				try{
					const cartListInfo = await api._getCartList({data:{uid},token:authorization});
					// console.log(cartListInfo,'cartListInfo')
					cartListInfo.data.list = cartListInfo.data.list ? cartListInfo.data.list : [];
					cartListInfo.data.list.forEach(item=>{
						item.img = config.apiurl + item.img;
						item.checked = item.checked == 1 ? true : false;
						item.attribute = item.attribute.split(',');
					})
					this.carts = cartListInfo.data.list;
					console.log(this.carts,'carts')
					
					
				}catch(err){
					console.log(err,'购物车数据错误')
				}
				
				
			},
			
			
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