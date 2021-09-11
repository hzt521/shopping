<template>
  <div id="home" class="wrapper"  >
    <!-- 在组件里面填插槽 -->
      <nav-bar class="home-nav"><template v-slot:center>购物街</template></nav-bar>
      <tab-control 
        class="tabControl"
        :titles="['流行','新款','精选']" 
        @tabClick="tabClick" 
        ref="tabControl1"
        v-show="isTabFixed"></tab-control>
      <scroll class="content" 
              ref="scroll" 
              :probe-type="3" 
              @scroll="contentScroll"
              @scrollToEnd="loadMore" >
        <home-swiper :banners="banners" 
        @swiperImageLoad="swiperImageLoad"></home-swiper>
        <home-recommend :recommends="recommends"></home-recommend>
        <home-feature></home-feature>
        <tab-control 
        :titles="['流行','新款','精选']" 
        @tabClick="tabClick" 
        ref="tabControl2"
        ></tab-control>
        <goods-list :goods="showGoods"></goods-list>
      </scroll>
      <back-top class="backtop" @click="backClick" v-show="isShowBackTop"></back-top>
  
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabcontrol/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backtop/BackTop'
import Scroll from 'components/common/scroll/Scroll'

import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommend from './childComps/HomeRecommend'
import HomeFeature from './childComps/HomeFeature'

import {getHomeMultidata ,getHomeData} from 'network/home'
import { log } from 'util';


export default{
  name:"Home",
  components:{
    NavBar,
    TabControl,
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
    GoodsList,
    BackTop,
    Scroll
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
      isShowBackTop:true,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0,
    }
  },


  computed:{
     showGoods(){
       return this.goods[this.currentType].list
     }
  },
  destroyed() {
    console.log("销毁")
  },
  activated () {
    //进来时
    console.log('activated')
    this.$refs.scroll.scrollTo(0,this.saveY,1)
    this.$refs.scroll.refresh()
    
  },
  deactivated() {
    //离开的时候保存位置
    console.log('deactivated')
    this.saveY = this.$refs.scroll.getScrollY()
    console.log(this.saveY)
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
    // 获取tabControl的offsetTop，但是获取到的是还没有加载完轮播图的值，所以需要监听轮播图是否加载完
    //所有的组件都有一个属性$el,用于获取组件中的元素
    //console.log(this.$refs.tabControl.$el.offsetTop);
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
         //console.log(res);
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
       //解决bug,滚动时流行，新款等会变，两个tabControl不一致
       this.$refs.tabControl1.currentIndex=index;
       this.$refs.tabControl2.currentIndex=index;
     },
     backClick(){
         //console.log("点击事件");
         this.$refs.scroll.scrollTo(0,0)
     },
     contentScroll(position){
       //1.判断backTop是否显示
       this.isShowBackTop = -position.y>1000;

       //2.判断tabControl是否吸顶
       this.isTabFixed = (-position.y)>this.tabOffsetTop;
     },
     loadMore(){
       this.getHomeData(this.currentType);
     },
     swiperImageLoad(){
       //console.log(this.$refs.tabControl.$el.offsetTop);
       this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
     }
         
   },


 
}
</script>

<style scoped>
.home-nav{
  background-color:var(--color-tint);
  color:white;
  /* 固定导航栏 */
  /* 因为使用了better-scroll,只会在content区域里滚动，即使不设置fixed导航也不会滚动
  position: fixed;
  top: 0px;
  left: 0;
  right: 0px;
  z-index: 9;
   */
   
}
#home{
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}

.content{
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0px;
  
}

.tabControl{
  position: relative;
  z-index: 9;
}


</style>
