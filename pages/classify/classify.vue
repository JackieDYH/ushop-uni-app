<template>
	<view class="container">
		<!-- left左侧列表 -->
		<view class="left">
			<!-- 循环遍历的 -->
			<view class="left_list" :class="activeIndex == index ? 'activeList' : ''" v-for="(item,index) in classInfo" :key="index" @click="_activeLeftList(index)">
				<label for="">{{ item.catename }}</label>
			</view>
		</view>
		<!-- right右侧详细分类商品 -->
		<view class="right">
			<!-- 每一个小类 -->
			<view class="right_list">
				<view class="tou">
					<view>二级分类</view>
					<!-- activeIndex是大类的索引，ind是小类的索引 -->
					<label class="span1">更多></label>
				</view>
				<!-- 商品 -->
				<view class="bottom" v-if="classInfo.length!==0">
					<!-- <view class="bottom_list" v-for="(val,key) in classlist" :key="key" @click="_goToList(val.id)"> -->
					<!-- 第二种方式 -->
					<view class="bottom_list" v-for="(val,key) in classInfo[activeIndex].children" :key="key" @click="_goToList(val.id)">
						<!-- 每个最多显示6个 -->
						<view v-if="key < 6">
							<image :src="_getImgUrl(val.img)">
						</view>
						<view class="title" v-if="key < 6">
							<span>{{val.catename}}</span>
						</view>
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	let classify = require('../../common/data/classify.js')
	// console.log(classify.default)
	
	import api from '../../utils/api/classify.js';
	import config from '../../utils/config.js';
	import tool from '../../utils/tool.js';
	
	
	export default {
		data(){
			return {
				classInfo:[],//分类数据
				classlist:[],//分类数据 第一中方式
				
				activeIndex:0,//大分类的下标
				
				classify:classify.default,//对应的分类及商品
			}
		},
		// 使用vue生命周期
		mounted(){
			this._getcatelist();
		},
		methods:{
			_getImgUrl(img){
				return config.apiurl + img;
			},
			
			// 获取所有分类
			async _getcatelist(){
				const cateRes = await api._getcatelist();
				// console.log(cateRes,11111);
				this.classInfo = cateRes.data.list;
				
				// 处理图片链接 第二种方式
				// cateRes.data.list.forEach(item=>{
				// 	 //有些分类没有二级分类，所以要做一个判断
				// 	 item.children = item.children ? item.children : []
					 
				// 	 item.children.forEach(item=>{
				// 		 item.img = config.apiurl + item.img
				// 	 })
				// })
				
				this._activeLeftList(0);
			},
			
			// 切换选中操作
			_activeLeftList(index){
				this.activeIndex = index
				this.classlist = this.classInfo[this.activeIndex].children;
			},
			
			// 跳转到分类列表页 查询所有二级分类
			_goToList(id){
				uni.navigateTo({
					url:`../search/search?sid=${id}`
				})
			},
			
			
			
			
			// 进入商品详情页面
			toDetails(ind,key,activeIndex){
				//ind为当前商品索引，tagsIndex为当前大分类索引
				//1.获取当前立即购买的商品信息
				let product = this.classify[activeIndex].content[ind].itemecon[key];
				
				// undefined
				// console.log(product)
				//将获取到的数据传递到商品详情页面
				uni.navigateTo({
					url:"/pages/details/details?product="+encodeURIComponent(JSON.stringify(product))
				})
			},
			
			// 跳转到商品列表页
			toProduct(activeIndex,ind){
				
				uni.navigateTo({
					url:"/pages/product/product?activeIndex="+activeIndex+"&ind="+ind,
				})
			}
		}
	}
</script>

<style>
	/* 导入外部的样式文件 */
	@import url("../../common/css/classify.css");
	
	/* 点击左侧导航，显示动态样式 */
	.activeList{
		border-left: 6rpx solid #f26b11;
		color: #f26b11;
	}
</style>
