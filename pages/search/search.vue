<template>
	<view>
		<uni-search-bar :radius="100" bgColor="#ffffff" class="input_" @confirm="_search"></uni-search-bar>
		<view class="list" v-if="searchGoodsList.length > 0">
			
			<view class="row" v-for="(item,index) in searchGoodsList" :key="item.id">
				<image :src="item.img" mode="widthFix"></image>
				<view class="info">
					<text>{{item.goodsname}}</text>	
					<text>原价￥{{item.market_price}}</text>	
					<text>现价￥{{item.price}}</text>	
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
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	
	import api from '@/utils/api/index.js'
	import config from '@/utils/config.js'
	
	export default {
		components: {uniSearchBar},
		data() {
			return {
				searchGoodsList:[],//搜索到的商品
			}
		},
		methods:{
			//搜索数据
			async _search(e){
				
				if( !e.value ){
					uni.showToast({
						title:"关键字不能为"
					})
					return
				}
				
				let searchGoods = await Api._getSearchGoods( e.value )
				// console.log( e,'confirm' )
				//console.log( searchGoods,'11111' )
				searchGoods.data.list = searchGoods.data.list ? searchGoods.data.list : []
				searchGoods.data.list.forEach(item=>{
					item.img = apiurl + item.img
				})
				this.searchGoodsList = searchGoods.data.list
				console.log(this.searchGoodsList)
			}
		}
		
		
	}
</script>

<style>

	.row{
		position: relative;
		margin: 10rpx 20rpx;
		height: 190rpx;
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
