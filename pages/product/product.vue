<template>
	<view>
		<view class="search">
			<icon type="search" color="white" size="10"></icon>
			<input type="text" value="" placeholder="搜索商品" placeholder-class="placeholder" @focus="_goToSearch" />
		</view>
		<view class="list" v-if="productList.length > 0">
			<view class="row" v-for="(item,index) in productList" :key="item.id">
			<!-- <view class="row"> -->
				<image :src="item.img" mode="widthFix"></image>
				<view class="info">
					<text>{{item.goodsname}}</text>	
					<text>￥{{item.price}}</text>	
					<text>3565评论</text>	
				</view>
			</view>
		</view>
		<view class="tishi" v-else>
			没有数据亲！
		</view>
	</view>
</template>

<script>
	// import Api from '@/utils/api.js'
	// import config  from '@/utils/config.js'
	
export default {
	data(){
		return {
			// page:1,//控制页码
			// size:4,//每页几条
			// productList:[],//商品列表
			// isNoMore:false,//是不是没有更多
		}
	},
	mounted(){
		console.log(this,'有差异')
		// 
		//let fid = this.$mp.query.fid
		// this._getProductList( )
	},
	onReachBottom(){
		
		// this.page++
		// this._getProductList()
		
	},
	methods:{
		
		//跳转到搜索页
		// _goToSearch(){
		// 	uni.navigateTo({
		// 		url:"../search/search"
		// 	})
		// },
		
		//获取对应类别的商品
		// async _getProductList(fid){
		// 	//fid page size
		// 	if( this.isNoMore ) return
			
		// 	uni.showLoading() //建议大家把此方法封装起来
			
		// 	let productListInfo = await Api._getProductList({
		// 		fid: this.$mp.query.fid,
		// 		page:this.page,
		// 		size:this.size
		// 	})
		// 	console.log( productListInfo,'拿到数据' )
		// 	if( ! productListInfo.data.list[1] ){
				
		// 		this.isNoMore = true
		// 		uni.hideLoading() //建议大家把此方法封装起来
		// 		return
		// 	}
		// 	 productListInfo.data.list[1].forEach(item=>{
		// 		 item.img = apiurl + item.img
		// 	 })
		// 	uni.hideLoading() //建议大家把此方法封装起来
		// 	this.productList = this.productList.concat( productListInfo.data.list[1] )
		// }
	}
}
</script>

<style>
	.search{
		margin: 50rpx;
		height: 80rpx;
		background-color: #f26b11;
		border-radius: 80rpx;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	icon{
		margin:0 10rpx 0 250rpx;
	}
	.placeholder{
		color: white;
		font-size: 25rpx;
	}
	.row{
		position: relative;
		margin: 10rpx 20rpx;
		height: 330rpx;
		border-bottom: 1rpx solid #AAAAAA;
	}
	image{
		position: absolute;
		top: 0;
		left:10rpx;
		width: 160rpx;
	}
	.info{
		height: 85%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 200rpx;
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		font-size: 25rpx;
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
