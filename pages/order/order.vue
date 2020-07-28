]<template>
	<view>
		<uni-search-bar :radius="100" bgColor="#ffff" @confirm="search" @input="input" @cancel="cancel"></uni-search-bar>
		<view class="list" v-if="ordersList.length > 0">
			<view class="row" v-for="(item1,index1) in ordersList" :key="item1.id">
				<view class="products">
					<view class="imagebox" v-for="(item2,index2) in item1.child">
						<image :src="item2.img" mode="widthFix"></image>
						<text>{{item2.goodsname}}</text>
					</view>
				</view>
				<view class="info">
					<text  space="nbsp">总计{{item1.countnumber}}商品  </text>  
					<text>实付金额 ￥:{{item1.countmoney}}</text>
				</view>
			</view>
		</view>
		<view class="tishi" v-else>
			没有数据亲！
		</view>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
	
	import api from '@/utils/api/login.js';
	import tool  from '@/utils/tool.js';
	import config  from '@/utils/config.js';
	
	export default {
		components: {uniSearchBar},
		data() {
			return {
				ordersList:[],//当前用户的所有订单数据
			}
		},
		onLoad(options){
				this._getOrders();
		},
	
		methods: {
			async _getOrders(){
				
				let userinfo = tool._getStorage('userInfo');
				
				let ordersInfo = await api._getOrder({
					data:{ uid:userinfo.uid },
					token:userinfo.token
				})
				// console.log( ordersInfo,'123' )
				
				ordersInfo.data.list = ordersInfo.data.list ? ordersInfo.data.list : [];
				ordersInfo.data.list.forEach(item=>{
					item.child = item.child ? item.child : [];
					item.child.forEach(item=>{
						item.img = config.apiurl + item.img;
					})
				})
				
				this.ordersList = ordersInfo.data.list;
				console.log( this.ordersList,456 )
			}
		},
		
	}
</script>

<style>

	.row{
		margin: 10rpx 20rpx;
		/* height: 240rpx; */
		border: 1rpx solid #AAAAAA;
		border-radius: 30rpx;
	}
	
	.imagebox{
		display: flex;
		margin:10rpx;
	}
	.imagebox text{
		width: 80%;
		padding: 80rpx 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.products{
		overflow: hidden;
	}
	image{
		width: 160rpx;
		margin-left: 10rpx;
		border-radius: 20rpx;
	}
	.info{
		/* position: absolute;
		top: 180rpx;
		right: 50rpx; */
		display: flex;
		justify-content: space-between;
		font-size: 25rpx;
		/* width: 340rpx; */
		padding: 20rpx;
		text-align: right;
	}
	.info text:nth-of-type(2){
		color: red;
	}
	.info text:nth-of-type(3){
		font-size: 20rpx;
		color: #AAAAAA;
	}
	.tishi{
		line-height: 200rpx;
		text-align: center;
		font-size: 40rpx;
		color: #006699;
	}
</style>
