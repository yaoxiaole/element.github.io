<template>
    <div id="app">
        <!-- 把sellerData传到Header组件 -->
        <MyHeader :sellerData='seller'></MyHeader>
        <!-- 路由跳转 -->
        <div class="tab">
            <ul class="router-tab">
                <router-link to="goods" tag='li' class="item">商品</router-link>
                <router-link to="ratings" tag='li' class="item">评论</router-link>
                <router-link to="seller" tag='li' class="item">商家</router-link>
            </ul>
        </div>
        <!-- 把seller，ratings，seller传到商品 评论 商家组件 -->
        <router-view :seller="seller" :foods="foods" :ratings="ratings"></router-view>
    </div>
</template>

<script>
import MyHeader from './components/Header/Header.vue'
export default {
    data() {
        return {
            seller: {},
            foods:[],
            ratings:[]
        }
    },
    //注册组件
    components: {
        MyHeader
    },
    methods: {
        //通过axios请求本地数据
        getSellData() {
            const _this = this;
            this.$http('../data.json').then(function(data) {
                _this.seller = data.data.seller;
                _this.foods = data.data.goods;
                _this.ratings = data.data.ratings;
            })
        }
    },
    //实例化完成后执行
    mounted() {
        this.getSellData();
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import './assets/stylus/border.styl'
    .router-tab
        display flex
        width 100%
        height 40px
        line-height 40px
        border-1px(rgba(7,17,27,0.1))
        .item
            flex 1
            text-align center
            font-size 14px
            color rgb(77,85,93)
        .router-active
            color rgb(240,20,20)
</style>
