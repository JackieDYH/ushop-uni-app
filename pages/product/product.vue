<template>
	<view>
		<view class="search">
			<uni-icon type=""></uni-icon>
			<input type="text" value="" placeholder="搜索商品" />
		</view>
	</view>
</template>

<script>
	// 获取所有的数据
	let classify = require('../../common/data/classify.js')
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		onLoad(options){
			// console.log(options)
			let {activeIndex,ind} = options;
			//直接获取当前类别下的所有商品
			let products = classify.default[activeIndex].content[ind].itemecon;
			
			console.log(products)
		}
	}
</script>

<style>
	.search{
		width: 100%;
		height: 150rpx;
		border: 1px solid red;
	}
</style>
