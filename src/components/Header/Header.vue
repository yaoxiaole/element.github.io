<template>
	<div class="header">
		<div class="header-top">
			<div class="avatar">
				<img :src="sellerData.avatar" width="64" height="64">
			</div>
			<div class="seller-des">
				<p class="title">
					<img src="./brand@2x.png" height="18" width="30">
					<span>{{sellerData.name}}</span>
				</p>
				<p class="description">{{sellerData.description}} / {{sellerData.deliveryTime}}分钟送达</p>
				<p v-if='sellerData.supports' class="supports">
					<img src="./decrease_2@2x.png" height="16" width="16">
					<span>{{sellerData.supports[0].description}}</span>
				</p>
			</div>
			<div class="number" v-if='sellerData.supports' @click='isShowDetails()'>
				<span>{{sellerData.supports.length}}个</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div class="header-bottom" @click='isShowDetails()'>
			<img src="./bulletin@2x.png" height="12" width="22">
			<span>{{sellerData.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="background">
			<img :src="sellerData.avatar" width="100%" height="100%">
		</div>
		<transition enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
			<div class="details" v-show='isShow'>
				<div class="details-wrapper clearfix">
					<div class="details-main">
						<div class="details-name">
							<h1>{{sellerData.name}}</h1>
						</div>
						<div class="details-rate">
							<el-rate v-model="sellerData.score" disabled text-color="#f90" text-template="{value}">
							</el-rate>
						</div>
						<div class="details-title">
							<div class="line"></div>
							<div class="text">优惠信息</div>
							<div class="line"></div>
						</div>
						<ul class="details-supports" v-if='sellerData.supports'>
							<li class="item" v-for='(item,index) in sellerData.supports' :key='index'>
								<img src="./discount_2@2x.png" alt="" width="16" height="16">
								<span>{{item.description}}</span>
							</li>
						</ul>
						<div class="details-title">
							<div class="line"></div>
							<div class="text">商家公告</div>
							<div class="line"></div>
						</div>
						<div class="details-bulletin">
							<p class="text">{{sellerData.bulletin}}</p>
						</div>
					</div>
				</div>
				<div class="details-close">
					<i class="icon-close" @click='hideDetails()'></i>
				</div>
			</div>
		</transition>
	</div>
</template>

<script type="ecmascript-6">
export default {
	//此处接收从App.vue传过来的数据
	props: {
		sellerData: {
			type: Object,
			default: {}
		}
	},
	data() {
		return {
			//定义商品优惠信息界面显示隐藏，默认隐藏
			isShow: false
		}
	},
	methods: {
		//商品优惠信息界面显示
		isShowDetails() {
			this.isShow = true;
		},
		//商品优惠信息界面隐藏
		hideDetails() {
			this.isShow = false;
		}
	}
}
</script>

<style scoped lang='stylus' rel="stylesheet/stylus">
	@import '../../assets/css/animate.min.css';
	.header
		background rgba(7,17,27,0.5)
		position relative
		.header-top
			color #fff
			padding 24px 12px 18px 24px
			font-size 0
			position relative
			.avatar
				display inline-block
				img
					border-radius 2px
			.seller-des
				font-size 14px
				display inline-block
				margin-left 16px
				padding 0 2px
				.title
					margin-bottom 6px
					img
						border-radius 2px
						margin-right 6px
					span
						vertical-align top
						font-size 16px
						font-weight bold
				.description
					font-size 12px
					font-weight 200
					margin-bottom 8px
				.supports
					img
						margin-right 4px
					span
						vertical-align top
						font-size 14px
						font-weight 200
			.number
				position absolute
				right 12px
				bottom 18px
				padding 0 8px
				height 24px
				line-height 24px
				border-radius 14px
				background rgba(0,0,0,0.2)  
				span
					font-size 10px 
					vertical-align top
				.icon-keyboard_arrow_right
					font-size 10px 	
					line-height 26px
					margin-left 2px		
		.header-bottom
			height 28px
			line-height 28px
			white-space nowrap
			overflow hidden
			text-overflow ellipsis
			background rgba(0,0,0,0.2)
			color #fff
			padding 0 22px 0 12px
			position relative
			span
				font-size 10px
			img
				vertical-align top
				margin 10px 4px 0 0
			.icon-keyboard_arrow_right
				position absolute
				top 12px
				right 8px
				font-size 10px
		.background
			position absolute
			top 0
			left 0
			width 100%
			height 100%
			z-index -1
			filter blur(10px)
			overflow hidden
		.details
			width 100%
			height 100%
			background rgba(7,17,27,0.8)
			position fixed
			top 0
			left 0
			z-index 100
			overflow auto
			backdrop-filter blur(10px)
			.details-wrapper
				width 100%
				min-height 100%
				.details-main
					padding-top 64px
					padding-bottom 64px
					.details-name
						text-align center
						font-size 16px
						font-weight 700
						color #fff
					.details-rate
						text-align center
						margin-top 16px
					.details-title
						display flex
						width 80%
						margin 30px auto 24px auto
						color #fff
						.line
							flex 1
							position relative
							top -6px
							border-bottom1px solid rgba(255,255,255,0.2)
						.text
							margin 0 12px
							font-size 14px
							color #fff
							font-weight 700
					.details-supports
						width 80%
						margin 0 auto
						font-size 0
						.item
							margin-bottom 12px
							&:last-child
								margin-bottom 0
							img
								display inline-block
								width 16px
								height 16px
								background-size 16px 16px
								vertical-align top
								margin-right 6px
								background-repeat no-repeat
							span
								font-size 12px
								color #fff
								font-weight 200
								vertical-align center
								display inline-block
								margin-top 3px
								vertical-align middle
					.details-bulletin
						padding 0 12px
						width 80%
						margin 0 auto
						.text
							font-size 12px
							color #fff
							line-height 24px
							font-weight 200
			.details-close
				position relative
				width 32px
				height 32px
				margin -64px auto 0 auto
				font-size 32px
				color #fff
</style>