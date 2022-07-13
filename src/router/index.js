import Vue from 'vue'
import VueRouter from 'vue-router'

//todo 导入views的组件，用路由的懒加载模式导入
const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category.vue')
const Cart = () => import('views/cart/Cart.vue')
const Profile = () => import('views/profile/Profile.vue')

//? 1.安装路由
Vue.use(VueRouter)

//? 2.创建路由实例
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  }
]


const router = new VueRouter({
  routes,
  mode: 'history'

})
//? 3.导出路由
export default router