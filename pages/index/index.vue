<template>
	<view class="">
		<!-- 顶部信息 -->
		<view class="HomeTop">
		  <view class="logoView">
			<!-- logo -->
			<img class="logo" src="@/static/index/logo.jpg" alt="" />
		  </view>
		  <view class="inputView">
			<input class="textinput" :style="{textAlign: inputCenter}" type="text" @blur="inputBlur"  @focus="inputFocus" value="" :placeholder="placeholderText"/>
		  </view>
		</view>
		
		<!-- 顶部导航  scroll-view -->
		<view class="tabs">
		    <scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
		        <view v-for="(item,index) in topCateInfo"  :key="item.id" class="uni-tab-item" :id="item.id" :data-current="index" @click="ontabtap">
		            <text class="uni-tab-item-title" :class="topIndex==index ? 'uni-tab-item-title-active' : ''">{{item.catename}}</text>
		        </view>
		    </scroll-view> 
		</view>
		<!-- 推荐轮播图 -->
		<view class="">
			<swiper :indicator-dots="true" :autoplay="true" :interval="2000" :duration="1000">
				<swiper-item v-for="(item,index) in bannerInfo" :key="index">
					<view class="swiper-item">
						<image :src="item.img" mode=""></image>
					</view>
				</swiper-item>
				
			</swiper>
		</view>
		
		<!-- 功能导航开始 -->
		<!-- 功能导航 -->
		<view class="FunctNavCon">
		  <view class="FunctNavLi" v-for="(item,index) in FunNavList" :key="index" @click="toClassify(index)">
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
				<p class="LimitedTitle">每天零点场，好货秒不停</p>
				<!-- 倒计时 -->
				<view class="LimitTimeAll">
				  <label class="LimitTime">02</label>
				  <view class="maohao">:</view>
				  <label class="LimitTime">16</label>
				  <view class="maohao">:</view>
				  <label class="LimitTime">45</label>
				  <label class="Seckill">秒杀</label>
				</view>
				<image src="../../static/index/goods2.jpg" class="LimitedgoodsImg" alt="">
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
						<image  src="../../static/index/goods1.jpg" alt="">
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
							<image src="../../static/index/goods1.jpg" mode=""></image>
						</view>
					</view>
					<view class="HotBottomRight">
						<view class="HotBottomRightInfo">
							<label class="HotBottomRightInfoTitle">每日十件</label>
							<label class="HotBottomRightInfoDetail">只为你选好货</label>
						</view>
						<view class="HotBottomRightImage">
							<image src="../../static/index/goods1.jpg" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		  <!-- 轮播图2 -->
		<div class="Swiper2">
		  <image class="Swiper2Img" src="../../static/index/swiper1.jpg" alt />
		</div>
		
		<!-- 底部商品列表 -->
		<view class="products">
			<!-- 商品标签 -->
			<view class="tags">
				<view class="tag_list" :class="tagsIndex == ind ? 'active_tag_list' : '' " v-for="(tag,ind) in  tags" :key="ind" @click="activeTagList(ind)">
					<label for="">{{ tag.name }}</label>
				</view>
			</view>
			<!-- 标签对应的商品 -->
			<view class="tags_product">
				<view class="product" v-for="(product,ind) in products[tagsIndex].content" :key="ind">
					<view class="GoodsLeft">
						<image class="GoodsImg" :src="product.src" alt />
					</view>
					<view class="GoodsCont">
						<view class="GoodConTit">{{product.name}}</view>
						<view class="GoodsPrice">￥{{product.price}}</view>
						<view class="yimai">已售{{product.yishou}}件</view>
						<view class="Immed" @click="toDetails(ind,tagsIndex)">立即抢购</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '../../utils/api/index.js';
	export default {
		data() {
			return {
				topCateInfo:[],//顶部导航一级分类信息
				bannerInfo:[],//轮播图信息
				
				
				
				
				inputCenter:"center", // 顶部top搜索栏input标签中文本居中变量
				placeholderText:"寻找商品",//顶部top搜索栏input中placeholder中的文本变量
				topIndex: 0, //顶部标题被选中时的索引
				
				// topBars: [{ //顶部导航的数据
				//     name: '推荐',
				//     id: 'guanzhu'
				// }, {
				//     name: '女装',
				//     id: 'tuijian'
				// }, {
				//     name: '鞋包',
				//     id: 'tiyu'
				// }, {
				//     name: '居家',
				//     id: 'redian'
				// }, {
				//     name: '母婴儿童',
				//     id: 'caijing'
				// }, {
				//     name: '美食',
				//     id: 'yule'
				// }, {
				//     name: '男装',
				//     id: 'junshi'
				// }, {
				//     name: '电脑',
				//     id: 'lishi'
				// }, {
				//     name: '内衣',
				//     id: 'bendi'
				// }],
				swipers:[  //录播图数据
					"../../static/index/swiper.jpg",
					"../../static/index/swiper.jpg",
					"../../static/index/swiper.jpg"
				],
				FunNavList: [{  //功能导航数据
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
			tags:[{
					name: "热门推荐"
				},
				{
					name: "发现好货"
				},
				{
					name: "只看专场"
				},
				{
					name: "只看商品"
				}
			],
			tagsIndex:0,//tag默认选中的索引
			products: [{ //tag标签对应的数据
			          title: "热门推荐",
			          content: [{
			              yishou: "8000",
			              name: "1阿道夫修护滋养洗发香乳",
			              src: "../../static/index/goods1.png",
			              lei: "洗发水",
			              detail: "持久留香",
			              tol: "520ml*瓶",
			              type: "旗舰店正品焕新升级版",
			              price: "123.00",
			              pinglun: 3625,
			              id: "11",
			              num: 1,
			              check: false,
			              floatLeft: false
			            },
			            {
			              yishou: "8000",
			              name: "1阿道夫修护滋养洗发香乳",
			              src: "../../static/index/goods.jpg",
			              lei: "洗发水",
			              detail: "持久留香",
			              tol: "520ml*瓶",
			              type: "旗舰店正品焕新升级版",
			              price: "123.00",
			              pinglun: 3625,
			              id: "11",
			              num: 1,
			              check: false,
			              floatLeft: false
			            },
			            {
			              yishou: "8000",
			              name: "1阿道夫修护滋养洗发香乳",
			              src: "../../static/index/goods.jpg",
			              lei: "洗发水",
			              detail: "持久留香",
			              tol: "520ml*瓶",
			              type: "旗舰店正品焕新升级版",
			              price: "123.00",
			              pinglun: 3625,
			              id: "11",
			              num: 1,
			              check: false,
			              floatLeft: false
			            },
			            {
			              yishou: "8000",
			              name: "1阿道夫修护滋养洗发香乳",
			              src: "../../static/index/goods.jpg",
			              lei: "洗发水",
			              detail: "持久留香",
			              tol: "520ml*瓶",
			              type: "旗舰店正品焕新升级版",
			              price: "123.00",
			              pinglun: 3625,
			              id: "11",
			              num: 1,
			              check: false,
			              floatLeft: false
			            }
			          ]
			        }, {
			          title: "发现好货",
			          content: [{
			              yishou: "8000",
			              name: "2阿道夫修护滋养洗发香乳",
			              src: "../../static/index/goods.jpg",
			              lei: "洗发水",
			              detail: "持久留香",
			              tol: "520ml*瓶",
			              type: "旗舰店正品焕新升级版",
			              price: "123.00",
			              pinglun: 3625,
			              id: "11",
			              num: 1,
			              check: false,
			              floatLeft: false
			            },
			            {
			              yishou: "8000",
			              name: "2阿道夫修护滋养洗发香乳",
			              src: "../../static/index/goods.jpg",
			              lei: "洗发水",
			              detail: "持久留香",
			              tol: "520ml*瓶",
			              type: "旗舰店正品焕新升级版",
			              price: "123.00",
			              pinglun: 3625,
			              id: "11",
			              num: 1,
			              check: false,
			              floatLeft: false
			            },
			            {
			              yishou: "8000",
			              name: "2阿道夫修护滋养洗发香乳",
			              src: "../../static/index/goods.jpg",
			              lei: "洗发水",
			              detail: "持久留香",
			              tol: "520ml*瓶",
			              type: "旗舰店正品焕新升级版",
			              price: "123.00",
			              pinglun: 3625,
			              id: "11",
			              num: 1,
			              check: false,
			              floatLeft: false
			            },
			            {
			              yishou: "8000",
			              name: "2阿道夫修护滋养洗发香乳",
			              src: "../../static/index/goods.jpg",
			              lei: "洗发水",
			              detail: "持久留香",
			              tol: "520ml*瓶",
			              type: "旗舰店正品焕新升级版",
			              price: "123.00",
			              pinglun: 3625,
			              id: "11",
			              num: 1,
			              check: false,
			              floatLeft: false
			            }
			          ]
			        }, {
			          title: "只看专场",
			          content: [{
			              yishou: "8000",
			              name: "3阿道夫修护滋养洗发香乳",
			              src: "../../static/index/goods.jpg",
			              lei: "洗发水",
			              detail: "持久留香",
			              tol: "520ml*瓶",
			              type: "旗舰店正品焕新升级版",
			              price: "123.00",
			              pinglun: 3625,
			              id: "11",
			              num: 1,
			              check: false,
			              floatLeft: false
			            },
			            {
			              yishou: "8000",
			              name: "3阿道夫修护滋养洗发香乳",
			              src: "../../static/index/goods.jpg",
			              lei: "洗发水",
			              detail: "持久留香",
			              tol: "520ml*瓶",
			              type: "旗舰店正品焕新升级版",
			              price: "123.00",
			              pinglun: 3625,
			              id: "11",
			              num: 1,
			              check: false,
			              floatLeft: false
			            },
			            {
			              yishou: "8000",
			              name: "3阿道夫修护滋养洗发香乳",
			              src: "../../static/index/goods.jpg",
			              lei: "洗发水",
			              detail: "持久留香",
			              tol: "520ml*瓶",
			              type: "旗舰店正品焕新升级版",
			              price: "123.00",
			              pinglun: 3625,
			              id: "11",
			              num: 1,
			              check: false,
			              floatLeft: false
			            },
			            {
			              yishou: "8000",
			              name: "3阿道夫修护滋养洗发香乳",
			              src: "../../static/index/goods.jpg",
			              lei: "洗发水",
			              detail: "持久留香",
			              tol: "520ml*瓶",
			              type: "旗舰店正品焕新升级版",
			              price: "123.00",
			              pinglun: 3625,
			              id: "11",
			              num: 1,
			              check: false,
			              floatLeft: false
			            }
			          ]
			        }, {
			          title: "只看商品",
			          content: [{
			              yishou: "8000",
			              name: "4阿道夫修护滋养洗发香乳",
			              src: "../../static/index/goods.jpg",
			              lei: "洗发水",
			              detail: "持久留香",
			              tol: "520ml*瓶",
			              type: "旗舰店正品焕新升级版",
			              price: "123.00",
			              pinglun: 3625,
			              id: "11",
			              num: 1,
			              check: false,
			              floatLeft: false
			            },
			            {
			              yishou: "8000",
			              name: "4阿道夫修护滋养洗发香乳",
						  src: "../../static/index/goods.jpg",
			              lei: "洗发水",
			              detail: "持久留香",
			              tol: "520ml*瓶",
			              type: "旗舰店正品焕新升级版",
			              price: "123.00",
			              pinglun: 3625,
			              id: "11",
			              num: 1,
			              check: false,
			              floatLeft: false
			            },
			            {
			              yishou: "8000",
			              name: "4阿道夫修护滋养洗发香乳",
			              src: "../../static/index/goods.jpg",
			              lei: "洗发水",
			              detail: "持久留香",
			              tol: "520ml*瓶",
			              type: "旗舰店正品焕新升级版",
			              price: "123.00",
			              pinglun: 3625,
			              id: "11",
			              num: 1,
			              check: false,
			              floatLeft: false
			            },
			            {
			              yishou: "8000",
			              name: "4阿道夫修护滋养洗发香乳",
			              src: "../../static/index/goods.jpg",
			              lei: "洗发水",
			              detail: "持久留香",
			              tol: "520ml*瓶",
			              type: "旗舰店正品焕新升级版",
			              price: "123.00",
			              pinglun: 3625,
			              id: "11",
			              num: 1,
			              check: false,
			              floatLeft: false
			            }
			          ]
			        }],
			}
			
		},
		async onLoad() {
			// 用于测试
			// let cateInfo = await api._getCate()
			// console.log( cateInfo,'一级分类信息' )
		},
		// 挂载完成
		mounted() {
			// 获取顶部一级分类导航信息
			this._getTopCateInfo();
			// 获取轮播图信息
			this._getbanner();
		},
		// 自定义函数
		methods: {
			// 获取顶部一级分类导航信息	topCateInfo
			async _getTopCateInfo(){
				const infoRes = await api._getTopCateInfo();
				console.log(infoRes.data.list,'infores');
				this.topCateInfo = infoRes.data.list;
			},
			// 获取轮播图信息		bannerInfo
			async _getbanner(){
				const bannerRes = await api._getbanner();
				console.log(bannerRes,'res')
				this.bannerInfo = bannerRes.data.list;
			},
			
			
			
			
			
			// 搜索栏获取焦点时
			inputFocus(){
				this.inputCenter = "left"
				this.placeholderText = ""
			},
			// 搜索栏失去焦点时
			inputBlur(){
				this.inputCenter = "center"
				this.placeholderText = "寻找商品"
			},
			
			// 导航栏点击事件
			ontabtap(e) {
			    let index = e.target.dataset.current || e.currentTarget.dataset.current;
			    this.switchTab(index);
			},
			switchTab(index) {
				//当前点击的标题是自己的时候，直接返回
			    if (this.topIndex === index) {
			        return;
			    }
				//直接更新当前选中的索引
			    this.topIndex = index;
			},
			// tag标签点击改变
			activeTagList(index){
				this.tagsIndex = index;
			},
			// 点击直接调到商品分类页
			toClassify(index){
				// index == 3的时候，跳转分类页面
				if(index !=3)return false;
				uni.navigateTo({
				    url: '/pages/classify/classify'
				});
			},
			// 进入商品详情页面
			toDetails(ind,tagsIndex){
				//ind为当前商品索引，tagsIndex为当前大分类索引
				//1.获取当前立即购买的商品信息
				let product = this.products[tagsIndex].content[ind];
				// console.log(product)
				//将获取到的数据传递到商品详情页面
				uni.navigateTo({
					url:"/pages/details/details?product="+encodeURIComponent(JSON.stringify(product))
				})
			}
		}
	}
</script>

<style>
	/* 导入外部的样式文件 */
	@import url("../../common/css/index.css");
</style>
