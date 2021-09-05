<template>
  <div id="home">
    <!-- 在组件里面填插槽 -->
    <nav-bar class="home-nav"><template v-slot:center>购物街</template></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommend :recommends="recommends"></home-recommend>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommend from './childComps/HomeRecommend'
import {getHomeMultidata} from 'network/home'


export default{
  name:"Home",
  components:{
    NavBar,
    HomeSwiper,
    HomeRecommend
    
   },

  //将请求到的数据保存起来，因为getHomeMultidata函数调用完毕后里面数据会回收
   data(){
    return{
      //result:null
      banners:[],
      recommends:[]

    }
  },
   //组件创建好就发送网络请求，创建生命周期函数
   created() {
     //1.请求多个数据
     getHomeMultidata().then(res=>{
       //res就是请求到的数据
      console.log(res);
      //this.result= res;
      this.banners=res.data.banner.list;
      this.recommends=res.data.recommend.list;
      //console.log(this.banners);
     }) 
       }


 
}
</script>

<style scoped>
.home-nav{
  background-color:pink;
  color:white;
}

</style>
