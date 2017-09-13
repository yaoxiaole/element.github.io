<template>
    <transition enter-active-class="animated slideInRight" leave-active-class="animated bounceOut">
        <div class="foodInfo" v-show="showInfo" ref="food">
            <div class="foodInfo-war">
                <div class="balck" @click="hideFoodInfo">
                    <i class="icon-arrow_lift"></i>
                </div>
                <div class="food-img">
                    <img :src="foodMesg.image" alt="" height="335" width="100%">
                </div>
                <div class="food-des">
                <ul>
                    <li class="name">
                        {{foodMesg.name}}
                    </li>
                    <li class="sellCount">
                        <span>月售{{foodMesg.sellCount}}份</span><span>好评率{{foodMesg.rating}}%</span>
                    </li>
                    <li class="price">
                            <span class="new">￥{{foodMesg.price}}</span><span v-show="foodMesg.oldPrice" class="old">￥{{foodMesg.oldPrice}}</span>
                    </li>
                </ul>
                <div class="addCar" @click="addFood($event)" v-show="!foodMesg.count">
                    加入购物车
                </div>
                <v-CarControl v-show="foodMesg.count>0" :food="foodMesg" class="CarControl"></v-CarControl>
                </div>
                <div class="bg" v-show="foodMesg.info"></div>
                <div class="food-info" v-show="foodMesg.info">
                    <h2>商品介绍</h2>
                    <div class="info-msg">
                        <p>{{foodMesg.info}}</p>
                    </div>
                </div>
                <div class="bg"></div>
                <div class="rating">
                    <h2>商品评价</h2>
                    <v-RatingSelect @toggle="toggleContent" @sendParentType="getChildType" :desc="desc" :selectType="selectType" :onlyContent="onlyContent" :ratings="foodMesg.ratings"></v-RatingSelect>
                    <div class="rating-wrapper">
                        <ul v-show="foodMesg.ratings && foodMesg.ratings.length">
                            <li v-show="needShow(rating.rateType,rating.text)" v-for="(rating,index) in foodMesg.ratings"
                                class="rating-item border-1px" :key="index">
                                <div class="user">
                                    <span class="name">{{rating.username}}</span>
                                    <img class="avatar" width="12" height="12" :src="rating.avatar">
                                </div>
                                <div class="time">{{rating.rateTime | ratingTime}}</div>
                                <p class="text">
                                    <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import BScroll from 'better-scroll'
    import CarControl from '../Carcontrol/Carcontrol.vue'
    import RatingSelect from '../RatingSelect/RatingSelect.vue'
    import Vue from 'vue'
    const ALL = 2;
    export default{
        props:{
            //每一个foods的详细数据
            foodMesg:{
                type:Object,
                default(){
                    return{
                        count:0
                    }
                }
            }
        },
        data(){
            return{
                //定义商品详情页是否隐藏或显示，默认false
                showInfo:false,
                //foods评价默认全部高亮
                selectType:ALL,
                //是否只看有内容的评价高亮
                onlyContent:true,
                desc:{
                    all:'全部',
                    positive:'推荐',
                    negative:'吐槽'
                }
            }
        },
        methods:{
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
            getChildType(type){
                this.selectType = type;
                this.$nextTick(function(){
                    this.scroll.refresh();
                })
            },
            toggleContent() {
                this.onlyContent = !this.onlyContent;
                this.$nextTick(() => {
                    this.scroll.refresh();
                });
            },
            showFoodInfo(){
                this.showInfo = true;
                this.selectType = ALL,
                this.onlyContent = true,
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.food, {
                            click: true
                        });
                    } else {
                        this.scroll.refresh();
                    }
                });
            },
            addFood(){
                if(!this.foodMesg.count){
                   Vue.set(this.foodMesg,'count',1);
                }else{
                    this.foodMesg.count++;
                }
            },
            hideFoodInfo(){
                this.showInfo = false;
            }
        },
         components:{
            'v-CarControl':CarControl,
            'v-RatingSelect':RatingSelect
        }
    }
</script>

<style lang="stylus" scoped>
    @import '../../assets/stylus/border.styl';
    .foodInfo
        position fixed
        top 0
        bottom 48px
        z-index 8
        width 100%
        height 100%
        background #fff
        .balck
            position absolute
            top 15px
            left 10px
            color #fff
        .food-des
            position relative
            padding 18px
            .name
                font-size 14px
                font-weight 700
                color rgb(7,17,27)
            .sellCount
                font-size 10px
                color rgb(147,153,159)
                margin 8px 0 18px
                span    
                    margin-right 12px
            .price
                .new
                    font-size 14px
                    font-weight 700
                    color rgb(240,20,20)
                .old
                    font-size 10px
                    color rgb(147,153,159)
                    text-decoration line-through
                    margin-left 12px
        .addCar
            position absolute
            right 18px
            bottom 18px
            width 74px
            height 24px
            border-radius 12px
            background rgb(0,160,220)
            text-align center
            line-height 24px
            color #fff
            font-size 10px
        .CarControl
             position absolute
             right 18px
             bottom 18px
        .bg
            height 16px
            width 100%
            background #f3f5f7
            border-top 1px solid rgba(7,17,27,0.1) 
            border-bottom 1px solid rgba(7,17,27,0.1) 
        .food-info
            padding 18px
            h2
                font-size 14px
                color rgb(7,17,27)
            .info-msg
                line-height 24px
                padding-left 8px
                font-size 12px
                font-weight 200
                color rgb(77,85,93)
        .rating
            h2
                font-size 14px
                color rgb(7,17,27)
                margin 18px 0 0 18px
            .rating-wrapper
                padding 0 18px
                .rating-item
                    position relative
                    padding 16px 0
                    border-1px(rgba(7, 17, 27, 0.1))
                    .user
                        position absolute
                        right 0
                        top 16px
                        line-height 12px
                        font-size 0
                        .name
                            display inline-block
                            margin-right 6px
                            vertical-align top
                            font-size 10px
                            color rgb(147, 153, 159)
                        .avatar
                            border-radius 50%
                    .time
                        margin-bottom 6px
                        line-height 12px
                        font-size 10px
                        color rgb(147, 153, 159)
                    .text
                        line-height 16px
                        font-size 12px
                        color rgb(7, 17, 27)
                        .icon-thumb_up, .icon-thumb_down
                            margin-right 4px
                            line-height 16px
                            font-size 12px
                        .icon-thumb_up
                            color rgb(0, 160, 220)
                        .icon-thumb_down
                            color rgb(147, 153, 159)

</style>

