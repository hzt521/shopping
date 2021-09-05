<template>
  <div class="recommend">
   <div  class="recommend-item" v-for="(item,index) in recommends" :key="index">
    <a :href="item.link">
      <img :src="item.image" alt="">
      <div>{{item.title}}</div>
    </a>
   </div>
  </div>
</template>

<script>
export default{
  name:'HomeRecommend',
  props:{
    recommends:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
   },
  data(){
    return{
    }
  }
}
</script>

<style scoped>
.recommend{
  display:flex;
  width:100%;
  text-align: center;
  font-size: 13px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: solid 10px #eee; 
}
.recommend-item{
  flex:1;
  
}
.recommend-item img{
   height:65px;
   margin-bottom:10px;
}

</style>
