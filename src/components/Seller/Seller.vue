<template>
	<div class="seller" ref="seller">
		<div class="seller-warp">
			<div class="seller-des">
				<div class="seller-header">
					<h2>{{seller.name}}</h2>
					<el-rate v-model="seller.score" disabled text-color="#f90" text-template="{value}" class="score">
					</el-rate>
					<div class="sellCount">
						<span>({{seller.ratingCount}})</span>
						<span class="s1">月售{{countSellCount}}单</span>
					</div>
					<div class="collection">
						<i class="icon-favorite" @click="clickCollection" :class="{'active':collection}"></i>
						<p>{{collectionText}}</p>
					</div>
				</div>
				<div class="seller-bottom">
					<div class="minPrice item">
						<p>起送价</p>
						<span>{{seller.minPrice}}</span>
						<b>元</b>
					</div>
					<div class="deliveryPrice item">
						<p>商家配送</p>
						<span>{{seller.deliveryPrice}}</span>
						<b>元</b>
					</div>
					<div class="deliveryTime item">
						<p>平均配送时间</p>
						<span>{{seller.deliveryTime}}</span>
						<b>分钟</b>
					</div>
				</div>
			</div>
			<div class="bg"></div>
			<div class="notice">
				<div class="notice-warp">
					<h2>公告与活动</h2>
					<div class="notice-info">
						<p>{{seller.bulletin}}</p>
					</div>
				</div>
			</div>
			<ul class="item-list">
				<li v-for="(item,index) in seller.supports" :key="index" class="item">
					<img src="./decrease_2@2x.png" alt="" width="16" height="16"><span>{{item.description}}</span>
				</li>
			</ul>
			<div class="bg"></div>
			<div class="seller-img">
				<h2>商家实景</h2>
				<div class="img-warp" ref="picswarp">
					<ul ref="pic">
						<li v-for="(item,index) in seller.pics" :key="index" class="item-img">
							<img :src="seller.pics[index]" alt="" width="120" height="90">
						</li>
					</ul>
				</div>
			</div>
			<div class="bg"></div>
			<div class="seller-info">
				<h2>商家信息</h2>
				<ul>
					<li v-for="(item,index) in seller.infos" :key="index">
						{{item}}
					</li>
				</ul>
			</div>
		</div>
		<!-- <v-ShopCar></v-ShopCar> -->
	</div>
</template>

<script type="ecmascript-6">
	import BScroll from 'better-scroll'
	import shopCar from '../ShopCar/ShopCar.vue'
	export default{
		data(){
			return{
				collection:false
			}
		},
		props:{
			seller:{
				type:Object,
				default(){
					return{

					}
				}
			},
			foods:{
				type:Array
			}
		},
		methods:{
			clickCollection(){
				this.collection = !this.collection;
			},
			initScroll(){
				if(!this.scroll){
					this.scroll = new BScroll(this.$refs.seller,{
						click:true
					});
				}else {
					this.scroll.refresh();
				}
			},
			initPics(){
				this.$refs.pic.style.width = (120+6)*this.seller.pics.length-6;
				if(!this.picScroll){
					this.picScroll = new BScroll(this.$refs.picswarp,{
						 scrollX: true,
                		 eventPassthrough: 'vertical'
					});
				}else {
					this.picScroll.refresh();
				}
			}
		},
		computed:{
			collectionText(){
				if(this.collection){
					return '已收藏';
				}else{
					return '收藏';
				}
			},
			countSellCount(){
				let count = 0;
				this.foods.forEach(function(good) {
					good.foods.forEach(function(food){
						count+=food.sellCount;
					})
				});
				return count;
			}
		},
		mounted() {
			this.$nextTick(function(){
				this.initScroll();
				this.initPics();
			})
		},
		components:{
			'v-ShopCar':shopCar
		}
	}
</script>

<style scoped rel="stylesheet" lang="stylus">
	@import '../../assets/stylus/border.styl';
	.seller
		position fixed
		top 176px
		bottom 0
		width 100%
		overflow hidden
		z-index 9
		.seller-warp
			.seller-des
				padding 18px
				.seller-header
					position relative
					padding-bottom 18px
					border-1px(rgba(7,17,27,0.1))
					h2
						font-size 14px
						color rgb(7,17,27)
					.el-rate 
						display inline-block
						margin 8px 0px 0 0
					.sellCount
						display inline-block
						font-size 0
						padding-top 10px
						span	
							font-size 10px
							color rgb(77,85,93)
						.s1
							margin-left 12px
					.collection
						position absolute
						top 0px
						right 0px
						text-align center
						.icon-favorite
							font-size 24px
							color rgb(77,85,93)
							&.active
								color rgb(240,20,20)
						p
							margin-top 4px
							font-size 10px
							color rgb(77,85,93)
				.seller-bottom
					padding-top 18px
					display flex
					.item
						flex 1
						text-align center
						font-size 0
						p
							margin-bottom 4px
							font-size 10px
							color rgb(147,153,159)
						span 
							font-size 24px
							font-weight 200
							color rgb(7,17,27)
						b
							font-size 10px
					.minPrice
						border-right 1px solid rgba(7,17,27,0.1)
					.deliveryPrice
						border-right 1px solid rgba(7,17,27,0.1)
			.bg
				width 100%
				height 16px
				background #f3f5f7
				border-top 1px solid rgba(7,17,27,0.1)
				border-bottom 1px solid rgba(7,17,27,0.1)
			.notice
				padding 18px 18px 0
				.notice-warp
					border-bottom 1px solid rgba(7,17,27,0.1)
					h2
						font-size 14px
						color rgb(7,17,27)
					.notice-info
						padding 0 12px
						margin-top 8px
						p
							font-size 12px
							font-weight 200
							line-height 24px
							color rgb(240,20,20)
			.item-list
				padding 0 18px
				.item
					height 48px
					padding 0 12px
					line-height 48px
					border-1px(rgba(7,17,27,0.1))
					&:last-child
						border-none()
					img
						vertical-align top
						margin-top 16px
					span
						font-size 12px
						font-weight 200
						color rgb(7,17,27)
						margin-left 6px
						vertical-align top
			.seller-img
				padding 18px
				h2
					font-size 14px
					color rgb(7,17,27)
				.img-warp
					margin-top 12px
					width 100%
					overflow hidden
					white-space nowrap
					.item-img
						display inline-block
						margin-right 6px
						&:last-child
							margin-right 0
			.seller-info
				padding 18px
				h2
					font-size 14px
					color rgb(7,17,27)
				ul
					margin-top 12px
					li
						white-space warp
						height 16px
						padding 16px 12px
						color rgb(7,17,27)
						font-size 12px
						font-weight 200
						border-1px(rgba(7,17,27,0.1))
						line-height 16px
						&:last-child
							border-none()
						&:first-child
							border-top 1px solid rgba(7,17,27,0.1)
</style>