<template>
  <div id="home">
    <!-- 在组件里面填插槽 -->
    <nav-bar class="home-nav"><template v-slot:center>购物街</template></nav-bar>
    <swiper>
      <swiper-item v-for="(item,index) in banners.list" :key="index">
        <a :href="item.link">
        <img :src="item.image" alt="">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import {getHomeMultidata} from 'network/home'
import {Swiper,SwiperItem} from 'components/common/swiper'

export default{
  name:"Home",
  components:{
    NavBar,
    Swiper,
    SwiperItem
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
      //console.log(res);
      //this.result= res;
      this.banners=res.data.banner;
      this.recommends=res.data.recommend;
      console.log(this.banners.list[0].link);
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
