<template>
  <div id="home" class="wrapper" >
    <!-- 在组件里面填插槽 -->
      <nav-bar class="home-nav"><template v-slot:center>购物街</template></nav-bar>
      <home-swiper :banners="banners"></home-swiper>
      <home-recommend :recommends="recommends"></home-recommend>
      <home-feature></home-feature>
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
   <ul>
     <li>liebia</li>
     <li>liebia</li>
     <li>liebia</li>
     <li>liebia</li>
     <li>liebia</li>
     <li>liebia</li>
     <li>liebia</li>
     <li>liebia</li>
     <li>liebia</li>
     <li>liebia</li>
   </ul>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabcontrol/TabControl'
import GoodsList from 'components/content/goods/GoodsList'

import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommend from './childComps/HomeRecommend'
import HomeFeature from './childComps/HomeFeature'

import {getHomeMultidata ,getHomeData} from 'network/home'


export default{
  name:"Home",
  components:{
    NavBar,
    TabControl,
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
    GoodsList
    
    
   },

  //将请求到的数据保存起来，因为getHomeMultidata函数调用完毕后里面数据会回收
   data(){
    return{
      //result:null
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
            },
      currentType:'pop',
      

    }
  },
  computed:{
     showGoods(){
       return this.goods[this.currentType].list
     }
  },

   //组件创建好就发送网络请求，创建生命周期函数
   created() {
     
     //1.请求多个数据
     this.getHomeMulltidata()

     //2.请求商品数据
     this.getHomeData('pop')
     this.getHomeData('new')
     this.getHomeData('sell')

  },
  mounted() {
    // this.$refs.aaaa
  },

   methods: {
     /*
     网络请求相关方法
     */
     getHomeMulltidata(){
       getHomeMultidata().then(res=>{
       //res就是请求到的数据
      //console.log(res);
      //this.result= res;
      this.banners=res.data.banner.list;
      this.recommends=res.data.recommend.list;
      //console.log(this.banners);
     }) 
     },
     getHomeData(type){
       const page=this.goods[type].page+1;
       getHomeData(type,page).then(res=>{
         console.log(res);
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1;
       })
     },



     /*
     *事件监听相关方法
     */
     tabClick(index){
       switch(index){
         case 0:
           this.currentType='pop'
           break
         case 1:
           this.currentType='new'
           break
         case 2:
           this.currentType='sell'
           break
       }
       
     }
   },


 
}
</script>

<style scoped>
.home-nav{
  background-color:pink;
  color:white;
  /* 固定导航栏 */
  position: sticky;
  top: 0px;
  z-index: 1000;
  
}
/* #home{
  height: 100vh;
} */

/* .content{
  height: 100%;
  overflow: hidden;
} */
</style>
