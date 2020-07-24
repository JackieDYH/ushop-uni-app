<template>
	<view class="">
		<!-- 顶部信息 -->
		<view class="HomeTop">
			<view class="logoView">
				<!-- logo -->
				<img class="logo" src="@/static/index/logo.jpg" />
			</view>
			<view class="inputView">
				<input class="textinput" :style="{textAlign: inputCenter}" type="text" confirm-type="search" @confirm="inputSearch" value="" :placeholder="placeholderText" @focus="inputFocus" @blur="inputBlur" />
			</view>
		</view>

		<!-- 顶部导航  scroll-view -->
		<view class="tabs">
			<!--
			 为每一个按钮添加点击事件
			 1：要跳转到列表页（ 传参 ）
			 2：修改topCateActiveIndex 
			 -->
			<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false">
				<view v-for="(item,index) in topCateInfo" :key="item.id" class="uni-tab-item" @click="_goToProduct(item.id,index)">
					<text class="uni-tab-item-title" :class="topCateActiveIndex==index ? 'uni-tab-item-title-active' : ''">{{item.catename}}</text>
				</view>
			</scroll-view>
		</view>
		<!-- 推荐轮播图 -->
		<view class="">
			<swiper :indicator-dots="true" :autoplay="true" circular :interval="2000" :duration="1000">
				<swiper-item v-for="(item,index) in bannerInfo" :key="index">
					<view class="swiper-item">
						<image :src="item.img" />
					</view>
				</swiper-item>

			</swiper>
		</view>

		<!-- 功能导航开始 -->
		<!-- 功能导航 -->
		<view class="FunctNavCon">
			<view class="FunctNavLi" v-for="(item,index) in FunNavList" :key="index" @click="_goToClassify(index)">
				<image :src="item.icon" alt class="FunImg" />
				<p>{{item.name}}</p>
			</view>
		</view>

		<!-- 推荐部分 未写 -->
		<view class="HotGoods">
			<!-- 热推左侧 -->
			<view class="HotLeft">
				<view class="LimitedContent">
					<image class="LimitedImg" src="../../static/index/xianshi.jpg" alt />
					<label class="Limited">限时秒杀</label>
				</view>
				<view v-if="secKillInfo.length !== 0">
					
				<p class="LimitedTitle">{{ secKillInfo.title ? secKillInfo.title : '每天零点场，好货秒不停' }}</p>
				<!-- 倒计时 -->
				<view class="LimitTimeAll">
					<label class="Seckill">剩{{endTimeObj.d}}天</label>
					<label class="LimitTime">{{endTimeObj.h}}</label>
					<view class="maohao">:</view>
					<label class="LimitTime">{{endTimeObj.m}}</label>
					<view class="maohao">:</view>
					<label class="LimitTime">{{endTimeObj.s}}</label>
				</view>
				<view class="secKill">
					<image :src="secKillInfo.img" class="LimitedgoodsImg" alt="">
					<label class="msprice">￥{{secKillInfo.price}}</label>
				</view>
				
				</view>
				<view class="zwspNo" v-else>
					暂无秒杀商品
				</view>
				
			</view>

			<!-- 热推右侧 -->
			<view class="HotRight">
				<!-- 右侧顶部部分 -->
				<view class="HotTop">
					<view class="HomeTopInfo">
						<view class="HomeTopInfoOne">
							<label class="BrandNew">品牌上新</label>
							<label class="Discount">折</label>
						</view>
						<view class="HomeTopRobbig">
							<label>每日九点，抢大牌</label>
						</view>
					</view>
					<!-- <div> -->
					<view class="Cloth">
						<image :src="imgSwiper2.img" alt="">
					</view>

					<!-- </div> -->
				</view>
				<!-- 右侧底部 -->
				<view class="HotBottom">
					<view class="HotBottomLeft">
						<view class="HotBottomLeftInfo">
							<label class="HotBottomLeftInfoTitle">每日十件</label>
							<label class="HotBottomLeftInfoDetail">只为你选好货</label>
						</view>
						<view class="HotBottomLeftImage">
							<image :src="imgSwiper1.img" mode=""></image>
						</view>
					</view>
					<view class="HotBottomRight">
						<view class="HotBottomRightInfo">
							<label class="HotBottomRightInfoTitle">每日十件</label>
							<label class="HotBottomRightInfoDetail">只为你选好货</label>
						</view>
						<view class="HotBottomRightImage">
							<image :src="imgSwiper2.img" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 轮播图2 -->
		<div class="Swiper2">
			<image class="Swiper2Img" :src="imgSwiper" alt />
		</div>

		<!-- 底部商品列表 -->
		<view class="products">
			<!-- 商品标签 -->
			<view class="tags">
				<view class="tag_list" :class="tagsIndex == ind ? 'active_tag_list' : '' " v-for="(tag,ind) in  tags" :key="ind"
				 @click="activeTagList(ind)">
					<label for="">{{ tag.name }}</label>
				</view>
			</view>
			<!-- 标签对应的商品 -->
			<view class="tags_product">
				<!-- <view class="product" v-for="(item,index) in indexGoodsinfo[tagsIndex].content" :key="index"> -->
				<view class="product" v-for="(item,index) in indexGoodsList" :key="index">
					<view class="GoodsLeft">
						<image class="GoodsImg" :src="item.img" />
					</view>
					<view class="GoodsCont">
						<view class="GoodConTit">{{item.goodsname}}</view>
						<view class="GoodsPrice">￥{{item.price}}</view>
						<view class="yimai">已售 2000 件</view>
						<view class="Immed" @click="toDetails(ind,tagsIndex)">立即抢购</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
	
	import api from '../../utils/api/index.js';
	import config from '../../utils/config';
	export default {
		components:{
			uniSearchBar
		},
		data() {
			return {
				inputCenter: "center", // 顶部top搜索栏input标签中文本居中变量
				placeholderText: "寻找商品", //顶部top搜索栏input中placeholder中的文本变量

				topCateInfo: [], //顶部导航一级分类信息
				topCateActiveIndex: 0, //顶部标题被选中时的索引
				bannerInfo: [], //轮播图信息
				secKillInfo: [], //秒杀商品信息
				endTimeObj:{d:'0',h:'00',m:"00",s:'00'}, //秒杀倒计时
				
				imgSwiper:'',//广告图片 暂用轮播图其一代替
				imgSwiper1:'',//推广图片 暂用商品图代替
				imgSwiper2:'',//推广图片 暂用商品图代替

				FunNavList: [{ //功能导航数据
						name: "限时抢购",
						icon: require("../../static/index/xiaohuoban.png")
					},
					{
						name: "积分商城",
						icon: require("../../static/index/jifentixicopy.png")
					},
					{
						name: "联系我们",
						icon: require("../../static/index/lianxiwomen.png")
					},
					{
						name: "商品分类",
						icon: require("../../static/index/-shangpinfenlei-gai.png")
					}
				],
				tags: [{
						name: "热门推荐"
					},
					{
						name: "最新好货"
					},
					{
						name: "全部商品"
					}
				],
				tagsIndex: 0, //tag 默认首页商品列表的索引 0 ：热门  1：最新  2:全部
				indexGoodsinfo:[],//首页商品列表 全部数据
				indexGoodsList:[],//首页商品列表： 最新、推荐、所有（ 10 ）的某一组
			}

		},
		async onLoad() {
			// 用于测试
			// let cateInfo = await api._getCate()
			// console.log( cateInfo,'一级分类信息' )
		},
		// 挂载完成
		mounted() {
			this._getTopCateInfo(); // 获取顶部一级分类导航信息
			this._getbanner(); // 获取轮播图信息
			this._getSecKillInfo(); //获取秒杀商品信息
			this._getIndexGoods(); //选项卡商品信息获取
			
		},
		// 自定义函数
		methods: {
			// 搜索商品
			inputSearch(e){
				console.log(e.detail)
				uni.navigateTo({
					url:'../search/search'
				})
			},
			
			// 获取首页 推荐 、最新、所有 商品数据 _getIndexGoods
			// 注意：图片的地址拼接，只需要处理一次
			async _getIndexGoods(){
				const goodsRes = await api._getIndexGoods();
				// console.log(goodsRes,'goodsRes')
				this.indexGoodsinfo = goodsRes.data.list || [];
				// 有两种方式 可以直接使用indexGoodsinfo进行变量 见html部分
				this.indexGoodsinfo.forEach(obj=>{
					obj.content.forEach(item=>{
						item.img = config.apiurl + item.img;
					})
				});
				this.indexGoodsList = this.indexGoodsinfo[this.tagsIndex].content;
				// 临时处理推广图片
				this.imgSwiper1 = this.indexGoodsList[0];
				this.imgSwiper2 = this.indexGoodsList[1];
				// console.log(this.imgSwiper1)
			},
			
			// tag标签点击改变
			activeTagList(index) {
				this.tagsIndex = index;
				this.indexGoodsList = this.indexGoodsinfo[this.tagsIndex].content;
			},
			
			// 获取秒杀商品信息
			async _getSecKillInfo() {
				const killRes = await api._getSecKill();
				// console.log(killRes, 'resss')
				killRes.data.list[0].img = config.apiurl + killRes.data.list[0].img;
				this.secKillInfo = killRes.data.list[0];
				// 处理倒计时
				this._setEndTimes(this.secKillInfo.begintime,this.secKillInfo.endtime);
			},


			// 倒计时功能封装
			_setEndTimes(begintime, endtime) {
				// 验证秒杀开始时间是否过期
				// 后端api接口已修改 只输出 开始时间 <= 当前时间 <= 结束时间
				let t = setInterval(()=>{
					if (new Date().getTime() >= parseInt(begintime) && new Date().getTime() <= parseInt(endtime)) {
						// 计算当前时间 - 结束时间  转成秒
						let time = Math.abs((new Date().getTime() - parseInt(endtime)) / 1000);
						// 天 Math.floor
						let d = parseInt(time / 86400);
						// 时
						let h = parseInt((time % 86400) / 3600);
						// 分
						let m = parseInt((time % 3600) / 60);
						// 秒
						let s = parseInt(time % 60);
						// 格式化 00 ： 00 ： 00
						h = h < 10 ? '0' + h : h;
						m = m < 10 ? '0' + m : m;
						s = s < 10 ? '0' + s : s;
						
						this.endTimeObj = {d,h,m,s};
					}else{
						this.endTimeObj = {d:'0',h:'00',m:'00',s:'00'};
						clearInterval(t);//清除定时器
						this.secKillInfo = [];
						console.log('秒杀过期');
					}
				},1000);
			},

			// 跳转总分类页面 判断是否点的最后1个  index == 3
			_goToClassify(index) {
				if (index === 3) {
					uni.navigateTo({
						url: '/pages/classify/classify'
					});
				}
			},

			// 获取顶部一级分类导航信息	topCateInfo
			async _getTopCateInfo() {
				const infoRes = await api._getTopCateInfo();
				// console.log(infoRes.data.list, 'infores');
				this.topCateInfo = infoRes.data.list;
			},

			// 头部导航 跳转 改变下标
			_goToProduct(id, index) {
				// console.log(id,index)
				this.topCateActiveIndex = index
				//跳转到列表页
			},

			// 获取轮播图信息		bannerInfo
			async _getbanner() {
				const bannerRes = await api._getbanner();
				// 处理图片链接地址
				bannerRes.data.list.forEach(item => {
					item.img = config.apiurl + item.img;
				})
				// console.log(bannerRes,'res')
				this.bannerInfo = bannerRes.data.list;
				this.imgSwiper = this.bannerInfo[0].img
			},


			// ===============================================

			// 搜索栏获取焦点时 @focus="inputFocus"
			inputFocus() {
				this.inputCenter = "left"
				this.placeholderText = ""
			},
			// 搜索栏失去焦点时 @blur="inputBlur"
			inputBlur() {
				this.inputCenter = "center"
				this.placeholderText = "搜索商品"
			},

			// // 导航栏点击事件
			// ontabtap(e) {
			// 	let index = e.target.dataset.current || e.currentTarget.dataset.current;
			// 	this.switchTab(index);
			// },
			// switchTab(index) {
			// 	//当前点击的标题是自己的时候，直接返回
			// 	if (this.topIndex === index) {
			// 		return;
			// 	}
			// 	//直接更新当前选中的索引
			// 	this.topIndex = index;
			// },
			
			// 点击直接调到商品分类页
			// toClassify(index) {
			// 	// index == 3的时候，跳转分类页面
			// 	if (index != 3) return false;
			// 	uni.navigateTo({
			// 		url: '/pages/classify/classify'
			// 	});
			// },
			// 进入商品详情页面
			toDetails(ind, tagsIndex) {
				//ind为当前商品索引，tagsIndex为当前大分类索引
				//1.获取当前立即购买的商品信息
				let product = this.products[tagsIndex].content[ind];
				// console.log(product)
				//将获取到的数据传递到商品详情页面
				uni.navigateTo({
					url: "/pages/details/details?product=" + encodeURIComponent(JSON.stringify(product))
				})
			}
		}
	}
</script>

<style>
	/* 导入外部的样式文件 */
	@import url("../../common/css/index.css");
</style>
