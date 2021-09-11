<template>
 
<div id="app">
  
<router-view v-slot="{ Component }">
  <keep-alive>
    <component :is="Component" />
  </keep-alive>
</router-view>
    
  
  <mainTabBar></mainTabBar>
</div>
  
   
</template>
<script>
import MainTabBar from 'components/content/MainTabBar'

export default {
  name:"app",
  components:{
    MainTabBar
  }
  

}
</script>

<style >
@import url( "./assets/css/base.css");

</style>
