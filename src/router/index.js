import { createRouter, createWebHistory } from 'vue-router'
//懒加载
const Home =()=>import('views/home/Home')
const Category =()=>import('views/category/Category')
const Profile =()=>import('views/profile/Profile')
const Shopcart =()=>import('views/shopcart/Shopcart')

const routes = [
  {
    path:'/home',
    component:Home
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/profile',
    component:Profile
  },
  {
    path:'/shopcart',
    component:Shopcart
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
