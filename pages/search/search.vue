<template>
	<view>
		<uni-search-bar :radius="100" bgColor="#bbf9ff" class="input_" :placeholder="placeText ? placeText : '搜索商品'" @confirm="_getsearch"></uni-search-bar>
		
		<view class="list" v-if="searchGoodsList.length > 0">
			
			<view class="row" v-for="(item,index) in searchGoodsList" :key="item.id" @click="_goToDetail(item.id)">
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
			亲 暂无数据 ！
		</view>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	
	import api from '@/utils/api/search.js'
	import config from '@/utils/config.js'
	import tool from '@/utils/tool.js'
	
	export default {
		components: {uniSearchBar},
		data() {
			return {
				placeText:'',//搜索历史关键词
				searchGoodsList:[],//搜索到的商品
			}
		},
		mounted(){
			// console.log(this.options)
			// 首页直接搜索
			if(this.$mp.query.searchText){
				tool._showLoading();
				
				const { searchText } = this.$mp.query;
				this.placeText = searchText;
				this._search(searchText)
			}
			
			// 跳转的一级分类列表
			if(this.$mp.query.fid){
				tool._showLoading();
				this._getcategoods({fid:this.$mp.query.fid});
			}
			
			// 跳转的二级分类列表
			if(this.$mp.query.sid){
				tool._showLoading();
				this._getcategoods({sid:this.$mp.query.sid});
			}
		},
		methods:{
			
			// 获取 一 / 二级商品数据
			async _getcategoods(data={}){
				try{
					const cateRes = await api._getcategoods(data);
					cateRes.data.list.forEach(item=>{
						item.img = config.apiurl + item.img;
					});
					this.searchGoodsList = cateRes.data.list;
					tool._hideLoading();
				}catch(err){
					tool._hideLoading();
					console.log(err,'一二分类数据获取失败')
				}
			},
			
			// 跳转商品详情页
			_goToDetail(id){
				uni.navigateTo({
					url:`../details/details?id=${id}`
				})
			},
			
			// 搜索页面 搜索功能
			_getsearch(e){
				this.placeText = '';
				if(!e.value.trim()){
					tool._showToast({title:"关键词不能为空",icon:"loading"})
					return;
				}
				tool._showLoading();
				
				this._search(e.value);
			},
			
			//搜索页搜索数据
			async _search(t){
				try{
					const searchRes = await api._getSearchGoods(t);
					searchRes.data.list.forEach(item=>{
						item.img = config.apiurl + item.img;
					});
					// console.log(searchRes,'searchRes')
					this.searchGoodsList = searchRes.data.list;
					tool._hideLoading();
				}catch(err){
					tool._hideLoading();
					console.log(err,'搜索出错')
				}
			},
		}
		
		
	}
</script>

<style>

	.row{
		position: relative;
		margin: 10rpx 20rpx;
		height: 190rpx;
		border-bottom: thin solid #d1d1d1;
		/* box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.4);
		border-radius: 0.12rem; */
		overflow: hidden;
		padding: 20rpx 0 0;
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
	.info text:nth-of-type(1){
		color: #ffaa00;
		font-weight: bold;
		/* margin-top: 20rpx; */
		
		width: 60%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.info text:nth-of-type(2){
		color: red;
		/* padding: 24rpx 0 20rpx; */
	}
	.info text:nth-of-type(3){
		font-size: 20rpx;
		color: #AAAAAA;
		text-decoration: line-through;
	}
	.tishi{
		line-height: 200rpx;
		text-align: center;
		font-size: 40rpx;
		color: #006699;
	}
</style>
