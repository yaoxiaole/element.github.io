<template>
   <div class="carControl">
       <transition enter-active-class="animated slideInRight" leave-active-class="animated bounceOutRight">
            <div class="delete" v-show="food.count>0" @click="deleteNum($event)">
                <i class="icon-remove_circle_outline"></i>
            </div>
        </transition>
        <transition enter-active-class="animated slideInRight" leave-active-class="animated bounceOutRight">
            <div class="num" v-show="food.count>0">{{food.count}}</div>
        </transition>    
       <div class="add" @click="addNum($event)">
           <i class="icon-add_circle"></i>
       </div>
   </div>
</template>

<script>
    import Vue from 'vue'
    export default{
        props:{
            food:{
                type:Object
            }
        },
        methods:{
            addNum(ev){
                if (!ev._constructed) {
                    return;
                }
                if(!this.food.count){
                    Vue.set(this.food,'count',1);
                }else{
                    this.food.count++;
                }
            },
            deleteNum(ev){
                if (!ev._constructed) {
                    return;
                }
                this.food.count--;
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import '../../assets/css/animate.min.css';
    .carControl
        font-size 0
        .delete
            display inline-block
            .icon-remove_circle_outline
                font-size 24px
                color rgb(0,160,220)
        .num
            display inline-block
            font-size 10px
            margin 0 8px
            color rgb(147,153,159)
            vertical-align top
            line-height 24px
        .add
            display inline-block
            .icon-add_circle
                font-size 24px
                color rgb(0,160,220)
</style>

