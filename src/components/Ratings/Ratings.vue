<template>
	<div class="ratings" ref="ratingwarp">
		<div class="ratings-warp">
			<div class="ratings-header">
				<div class="header-left">
					<p class="score">{{seller.score}}</p>
					<p class="zh">综合评分</p>
					<p class="rankRate">高于周边商家{{seller.rankRate}}%</p>
				</div>
				<div class="header-right">
					<div class="service">
						<p>服务态度</p>
						<el-rate
							v-model="seller.serviceScore"
							disabled
							text-color="#ff9900"
							class="el-score"
							allow-half
							show-text
							>
						</el-rate>
					</div>
					<div class="foodScore">
						<p>服务态度</p>
						<el-rate
							v-model="seller.foodScore"
							disabled
							text-color="#ff9900"
							class="el-score"
							allow-half
							show-text
							>
						</el-rate>
					</div>
					<div class="deliveryTime">
						<span class="time">送达时间</span><span class="delivery">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<div class="bg"></div>
			<v-RatingSelect @toggle="toggleContent" @sendParentType="getChildType" :selectType="selectType" :onlyContent="onlyContent" :ratings="ratings"></v-RatingSelect>
			<div class="rating-wrapper">
				<ul v-show="ratings.length">
					<li v-show="needShow(rating.rateType,rating.text)" v-for="(rating,index) in ratings"
						class="rating-item" :key="index">
						<div class="avatar">
							<img :src="rating.avatar" alt="" width="28" height="28">
						</div>
						<div class="rateTime">
							{{rating.rateTime | ratingTime}}
						</div>
						<div class="rating-text">
							<h2>{{rating.username}}</h2>
							<div class="score">
								<el-rate
									v-model="rating.score"
									disabled
									text-color="#ff9900"
									class="el-score"
									allow-half
									>
								</el-rate>
								<p class="deliveryTime" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</p>
							</div>
							<p class="text">
								{{rating.text}}
							</p>
							<div class="tag">
								<p>
									<span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
								</p>
								<ul v-show="rating.recommend.length">
									<li v-for="(recommend,index) in rating.recommend" :key="index">
										{{recommend}}
									</li>
								</ul>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script type="ecmascript-6">
	import RatingSelect from '../RatingSelect/RatingSelect.vue'
	const ALL = 2;
	import BScroll from 'better-scroll'
	export default{
		data(){
			return{
				selectType:ALL,
                onlyContent:true
			}
		},
		props:{
			seller:{
				type:Object
			},
			ratings:{
				type:Array
			}
		},
		methods:{
			getChildType(type){
                this.selectType = type;
				this.$nextTick(() => {
                    this.initScroll();
                });
            },
            toggleContent() {
                this.onlyContent = !this.onlyContent;
				this.$nextTick(() => {
                    this.initScroll();
                });
            },
			 needShow(type, text) {
                if (this.onlyContent && !text) {
                    return false;
                }
                if (this.selectType === ALL) {
                    return true;
                } else {
                    return type === this.selectType;
                }
            },
			initScroll(){
				if(!this.scroll){
					this.scroll = new BScroll(this.$refs.ratingwarp,{
						click:true
					});
				}else {
					this.scroll.refresh();
				}
			}
		},
		components:{
            'v-RatingSelect':RatingSelect
        },
		mounted() {
			this.$nextTick(function(){
				this.initScroll();
			})
		}
	}
</script>

<style scoped rel="stylesheet" lang="stylus">
	@import '../../assets/stylus/border.styl';
	.ratings
		position absolute
		top 176px
		bottom 0
		width 100%
		overflow hidden
		.ratings-warp
			padding 18px 0px 18px
			.ratings-header
				display flex
				width 100%
				.header-left 
					flex 0 0 137px
					width 137px
					text-align center
					border-right 1px solid rgba(7,17,27,0.1)
					.score
						font-size 24px
						color rgb(255,153,0)
					.zh
						font-size 12px
						color rgb(7,17,27)
						margin 6px 0 8px
					.rankRate
						color rgba(7,17,27,0.5)
						font-size 10px
				.header-right 
					flex 1
					padding-left 10px
					.service,.foodScore
						p
							font-size 12px
							color rgb(7,17,27)
							display inline-block
						.el-score
							display inline-block
							margin-left 6px
					.foodScore
						margin 4px 0
					.deliveryTime
						.time
							color rgb(7,17,27)
							font-size 12px
						.delivery
							font-size 12px
							color rgb(147,153,159)
							margin-left 12px
			.bg
				width 100%
				height 16px
				margin-top 18px
				background #f3f5f7
				border-top 1px solid rgba(7,17,27,0.1)
				border-bottom 1px solid rgba(7,17,27,0.1)
			.rating-wrapper
				padding 0 18px
				.rating-item
					padding 18px 0
					display flex
					position relative
					border-1px(rgba(7,17,27,0.1))
					&:last-child
						border-none()
					.avatar
						display inline-block
						vertical-align top
						flex 0 0 28px
						width 28px
						img 
							border-radius 50%
					.rateTime
						position absolute
						top 18px
						right 0
						font-size 10px
						color rgb(147,153,159)
						font-weight 200
					.rating-text
						display inline-block
						vertical-align top
						margin-left 12px
						flex 1
						h2
							font-size 10px
							color rgb(7,17,27)
						.score
							margin 4px 0 6px
							.el-score
								display inline-block
							.deliveryTime
								display inline-block
								font-size 10px
								color rgb(147,153,159)
								font-weight 200
						.text
							font-size 12px
							color rgb(7,17,27)
							line-height 18px
							margin-bottom 8px
						.tag
							p
								display inline-block
								vertical-align middle
								.icon-thumb_up
									font-size 12px
									color rgb(0,160,220)
								.icon-thumb_down
									font-size 12px
									color rgb(183,187,191)
							ul
								display inline-block
								vertical-align top
								li
									float left
									font-size 9px
									color rgb(147,153,159)
									padding 0 6px
									border 1px solid rgba(7,17,27,0.1)
									line-height 16px
									white-space nowrap
									overflow hidden
									margin-right 8px

</style>