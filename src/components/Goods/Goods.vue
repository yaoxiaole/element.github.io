<template>
	<div class="goods">
		<div class="menu-warp" ref="menu">
			<ul>
				<li v-for='(item,index) in foods' class="menu-item" :key="index" @click="selectMenu(index,$event)">
					<i v-show='item.type > 0'></i>
					<span>{{item.name}}</span>
				</li>
			</ul>
		</div>
		<div class="foods-warp" ref="foods">
			<ul>
				<li v-for="(item,index) in foods" :key="index" class="foods-active">
					<div class="title">
						<h2>{{item.name}}</h2>
					</div>
					<ul>
						<li v-for="(item,index) in item.foods" :key="index" class="foods-list" @click="foodInfo(item,$event)">
							<div class="foods-icon">
								<img :src="item.icon" alt="" width="57" height="57">
							</div>
							<div class="foods-des">
								<div class="name">
									<h3>{{item.name}}</h3>
								</div>
								<div class="description" v-show="item.description">
									<span>{{item.description}}</span>
								</div>
								<div class="sellCount">
									<span>月售{{item.sellCount}}份</span>
									<span>好评率{{item.rating}}%</span>
								</div>
								<div class="price">
									<span>￥{{item.price}}</span><span v-show="item.oldPrice" class="oldPrice">￥{{item.oldPrice}}</span>
								</div>
							</div>
							<v-CarControl :food="item" class="CarControl"></v-CarControl>
						</li>
					</ul>	
				</li>
			</ul>
		</div>
		<v-ShopCar :minPrice="seller.minPrice" :deliveryPrice="seller.deliveryPrice" :selectFoods="selectFoods"></v-ShopCar>
		<v-FoodInfo :foodMesg="foodMesg" ref="foodMesgInfo"></v-FoodInfo>
	</div>
</template>

<script type="ecmascript-6">
import BScroll from 'better-scroll'
import ShopCar from '../ShopCar/ShopCar.vue'
import CarControl from '../Carcontrol/Carcontrol.vue'
import FoodInfo from '../foodInfo/FoodInfo.vue'
export default {
	//接收从<router-view></router-view>传过来的数据
	props:{
		seller:{
			type:Object,
			default(){
				return{

				}
			}
		}
	},
	data() {
		return {
			foods: [],
			foodMesg:{}
		}
	},
	computed:{
		//把每一个商品有count属性的传到Carcontrol组件
		selectFoods(){
			let foodArr = [];
			//先循环goods拿到每一个goods下所有的foods
			this.foods.forEach(function(el) {
				//再循环foods
				el.foods.forEach(function(food){
					//判断每一个foods身上有没有count属性,有就添加
					if(food.count){
						foodArr.push(food);
					}
				})
			});
			return foodArr;
		}
	},
	methods: {
		foodInfo(food,ev){
			//处理使用better-scroll在pc端点击事件会执行两次
			if (!ev._constructed) {
				return;
			}
			//如果点击的是添加商品就返回，否则就弹出商品的详情页
			if(ev.target.className == 'icon-remove_circle_outline' || ev.target.className == 'icon-add_circle'){
				return;
			}
			//把foodMesg传到商品详情页
			this.foodMesg = food;
			//调用商品详情页的方法
			this.$refs.foodMesgInfo.showFoodInfo();
		},
		//获取goods数据
		getFoodsData() {
			const _this = this;
			this.$http('../data.json').then(function(data) {
				_this.foods = data.data.goods;
				_this.$nextTick(function () {
					_this.initScroll();
				})
			})
		},
		//初始化better-scroll
		initScroll(){
			this.menuScroll = new BScroll(this.$refs.menu,{
				click:true
			});
			this.foodsScroll = new BScroll(this.$refs.foods,{
				click:true
			});
		},
		//左侧商品栏点击
		selectMenu(index,ev){
			if (!ev._constructed) {
				return;
			}
			//点击左侧的商品栏让右侧的foods关联
			this.foodsScroll.scrollToElement(this.$refs.foods.getElementsByClassName('foods-active')[index], 500);
		}
	},
	mounted() {
		this.getFoodsData();
	},
	components:{
		'v-ShopCar':ShopCar,
		'v-CarControl':CarControl,
		'v-FoodInfo':FoodInfo
	}
}
</script>

<style scoped lang='stylus' rel="stylesheet/stylus">
	@import '../../assets/stylus/border.styl';
	.goods
		position absolute
		top 176px
		bottom 48px
		display flex
		width 100%
		overflow hidden
		.menu-warp
			flex 0 0 56px
			width 56px
			background #f3f5f7
			padding 0 12px
			line-height 14px
			.menu-item
				height 54px
				width 56px
				display table
				border-1px(rgba(7,17,27,0.1))
				&:last-child
					border-none()
				span
					font-size 12px
					display table-cell
					width 56px
					vertical-align middle
		.foods-warp
			flex: 1
			.title
				height 26px
				background #f3f5f7
				border-left 2px solid #d9dde1
				font-size 12px
				line-height 26px
				color rgb(147,153,159)
				padding-left 14px
			.foods-list
				margin 18px
				padding-bottom 18px
				&:last-child
					margin-bottom 0
					border-none()
				border-1px(rgba(7,17,27,0.1))
				.foods-icon
					display inline-block
					vertical-align top
				.foods-des
					display inline-block
					font-size 12px
					vertical-align top
					padding-top 2px
					margin-left 10px
					.name
						font-size 14px
						color rgb(7,17,27)
						margin-bottom 8px
						line-height 14px
					.description
						color rgb(147,153,159)
						margin-bottom 8px
					.sellCount
						font-size 10px
						color rgb(147,153,159)
						line-height 10px
						margin-bottom 8px
					.Price
						color rgb(240,20,20)
						font-weight 700
						font-size 14px
						.oldPrice
							font-size 10px
							color rgb(147,153,159)
							margin-left 8px
							text-decoration line-through
				.CarControl
					position absolute
					right 0
					bottom 8px
</style>