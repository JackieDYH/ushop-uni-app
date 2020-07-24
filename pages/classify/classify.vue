<template>
	<view class="container">
		<!-- left左侧列表 -->
		<view class="left">
			<!-- 循环遍历的 -->
			<view class="left_list" :class="activeIndex == ind ? 'activeList' : ''" v-for="(item,ind) in itemTitle" :key="ind" @click="activeLeftList(ind)">
				<label for="">{{ item.text }}</label>
			</view>
		</view>
		<!-- right右侧详细分类商品 -->
		<view class="right">
			<!-- 每一个小类 -->
			<view class="right_list" v-for="(item,ind) in classify[activeIndex].content" :key="ind">
				<view class="tou">
					<view>{{item.title}}</view>
					<!-- activeIndex是大类的索引，ind是小类的索引 -->
					<label class="span1"  @click="toProduct(activeIndex,ind)">更多></label>
				</view>
				<!-- 商品 -->
				<view class="bottom">
					<view class="bottom_list" v-for="(val,key) in item.itemecon" :key="key" @click="toDetails(ind,key,activeIndex)">
						<!-- 每个最多显示6个 -->
						<view v-if="key < 6">
							<image :src="val.src" alt="">
						</view>
						<view class="title" v-if="key < 6">
							<span>{{val.name}}</span>
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
	export default {
		data(){
			return {
				activeIndex:0,
				// 左侧分类列表数据
				itemTitle: 
				[
					{
						"text": "施华蔻"
					},
					{
						"text": "沙宣"
					},
					{
						"text": "欧莱雅"
					},
					{
						"text": "潘婷"
					},
					{
						"text": "资生堂"
					},
					{
						"text": "阿道夫"
					},
					{
						"text": "卡诗"
					},
					{
						"text": "海飞丝"
					},
					{
						"text": "资生堂"
					}
				],
				classify:classify.default,//对应的分类及商品
			}
		},
		onLoad() {
			
		},
		methods:{
			// 切换选中操作
			activeLeftList(index){
				this.activeIndex = index
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
