import goods from '../components/Goods/Goods.vue'
export default [
    {
        path: '/',
        redirect:'goods'
    },
    {
        path: '/goods',
        component: resolve => require(['../components/Goods/Goods.vue'], resolve)
    },
    {
        path: '/ratings',
        component: resolve => require(['../components/Ratings/Ratings.vue'], resolve)
    },
    {
        path: '/seller',
        component: resolve => require(['../components/Seller/Seller.vue'], resolve)
    }
]