<template>
  <div class="shopcar">
      <div class="content" @click="toggle($event)">
          <div class="car-left">
              <div class="car-icon-warp">
                  <div class="car-icon" :class="{'active':totalCount>0}">
                      <i class="icon-shopping_cart" :class="{'active':totalCount>0}"></i>
                  </div>
              </div>
              <div class="car-num" v-show="totalCount>0">{{totalCount}}</div>
              <div class="car-text">
                  <span class="text" :class="{'active':totalCount>0}">￥{{totalPrice}}</span>
                  <span class="text2">另需配送费￥{{deliveryPrice}}元</span>
              </div>
          </div>
          <!-- 绑定属性不要加{} -->
           <div class="car-right" :class="payClass">
               {{payDes}}
           </div>
      </div>
      <transition enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
        <div class="shopcar-list" v-show="listShow">
            <div class="list-header">
                <h2>购物车</h2>
                <span @click="clearList">清空</span>    
            </div>
            <div class="list-content" ref="shoplist">
                <ul>
                    <li v-for="(item,index) in selectFoods" :key="index" class="food-item">
                        <h2>{{item.name}}</h2>
                        <v-CarControl :food="item" class="car-control"></v-CarControl>
                        <span>￥{{item.price*item.count}}</span>
                    </li>    
                </ul>
            </div>
        </div>
      </transition> 
      <transition enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
        <div class="list-mask" @click="hideList" v-show="listShow"></div>
      </transition> 
  </div>
</template>

<script>
    import CarControl from '../Carcontrol/Carcontrol.vue'
    import BScroll from 'better-scroll'
    export default{
        data(){
            return{
                fold:true
            }
        },
        methods:{
            toggle(ev){
                if(!this.totalCount){
                    return;
                }
                if(ev.target.className == 'car-right active'){
                   alert('一共支付'+(this.totalPrice+4)+'元');
                }else if(ev.target.className == 'car-right active-not'){
                    let num = this.minPrice-this.totalPrice;
                    alert('还差'+num+'元才能结算');
                    return;
                }else{
                    this.fold = !this.fold;
                }
            },
            clearList(){
                this.selectFoods.forEach(function(el){
                    el.count = 0;
                })
            },
            hideList(){
                this.fold = true;
            }
        },
        props:{
            deliveryPrice:{
                type:Number,
                default:0
            },
            minPrice:{
                type:Number,
                default:0
            },
            selectFoods:{
                 type:Array,
                 default(){
                     return []
                 }
            }
        },
        computed:{
            listShow() {
                if (!this.totalCount) {
                    this.fold = true;
                    return;
                }
                let show = !this.fold;
                if (show) {
                    this.$nextTick(() => {
                        if (!this.scroll) {
                            this.scroll = new BScroll(this.$refs.shoplist, {
                                click: true
                            });
                        } else {
                            this.scroll.refresh();
                        }
                    });
                }
                return show;
            },
            totalPrice(){
                let total = 0;
                this.selectFoods.forEach((food) => {
                    total += food.price * food.count;
                });
                return total;
            },
            totalCount(){
                let count = 0;
                this.selectFoods.forEach((food) => {
                count += food.count;
                });
                return count;
            },
            payDes(){
                if(this.totalPrice == 0){
                    return '￥'+this.minPrice+'元起送';
                }else if(this.totalPrice<this.minPrice){
                    let num = this.minPrice-this.totalPrice;
                    return '还差￥'+num+'元起送';
                }else{
                    return '去结算';
                }
            },
            payClass(){
                 return this.totalPrice < this.minPrice?'active-not':'active';
            }
        },
        components:{
            'v-CarControl':CarControl
        }
    }
</script>

<style lang="stylus" scoped>
    @import '../../assets/stylus/border.styl';
    .shopcar
        position fixed
        left 0
        bottom 0
        width 100%
        height 48px
        z-index 99
        .content
            display flex
            width 100%
            height 100%
            .car-left
                flex 1
                background #141d27
                position relative
                .car-icon-warp
                    display inline-block
                    position relative
                    top -10px
                    margin 0 12px
                    padding 6px
                    width 56px
                    height 56px
                    box-sizing border-box
                    vertical-align top
                    border-radius 50%
                    background #141d27
                    .car-icon
                        width 100%
                        height 100%
                        border-radius 50%
                        background #2b343c
                        text-align center
                        &.active
                            background rgb(0,160,220)
                        .icon-shopping_cart
                            font-size 24px
                            color #80858a
                            line-height 44px
                            &.active
                                color #fff
                .car-num
                    position: absolute
                    top: -10px
                    left: 44px
                    width: 24px
                    height: 16px
                    line-height: 16px
                    text-align: center
                    border-radius: 16px
                    font-size: 9px
                    font-weight: 700
                    color: #fff
                    background: rgb(240, 20, 20)
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
                .car-text
                     display inline-block
                     line-height 48px
                     font-size 0
                    .text
                        font-size 16px
                        font-weight 700
                        color #80858a
                        &.active
                            color #fff
                    .text2
                        font-size 16px
                        font-weight 0
                        color #80858a
                        margin-left 12px
            .car-right
                flex 0 0 105
                width 105px
                background #2b343c
                text-align center
                line-height 48px
                font-size 14px
                font-weight 700
                color #80858a
                &.active-not 
                    background #2b343c
                &.active 
                    background #00b43c
                    color #fff
        .shopcar-list
            position absolute
            left 0  
            bottom 48px
            width 100%
            z-index -1
            .list-header
                height 40px
                line-height 40px
                background #f3f5f7
                padding 0 18px
                border-bottom 1px solid rgba(7,17,27,0,1)
                h2
                    float left
                    font-size 14px
                    font-weight 200
                    color rgb(7,17,27)
                span 
                    float right 
                    font-size 12px
                    color rgb(0,160,220)
            .list-content
                padding 0 18px
                max-height 217px
                overflow hidden
                background #fff
                .food-item
                    height 48px
                    line-height 48px
                    border-1px(rgba(7,17,27,0.1))
                    h2
                        float left
                        font-size 14px
                        color rgb(7,17,27)
                    span 
                        float right
                        font-size 14px
                        color rgb(240,20,20)
                        margin-right 85px
                    .car-control
                        position absolute
                        right 0
                        top 10px
        .list-mask
           width 100%
           height 100%
           position fixed
           left 0
           top 0 
           z-index -2
           background rgba(7,17,27,0.6)
</style>

