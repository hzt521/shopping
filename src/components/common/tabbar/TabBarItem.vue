<template>
  
    <div  @click="itemClick" class="tab-bar-item">
      <div v-if="isActive"><slot name="item-icon"></slot></div>
      <div v-else><slot  name="item-icon-active"></slot></div>
      <div :class="{active:!isActive}"><slot  name="item-text"></slot></div>
    </div>     
  
</template>

<script>
export default{
  name:'TabBarItem',
//动态传入path
  props:{
    path:String
  },

  components:{
   },
  data(){
    return{
      // isActive:true
    }
  },
  computed:{
    isActive(){
      return this.$route.path.indexOf(this.path)
    }
  },
  methods: {
    itemClick(){
      this.$router.push(this.path)
    }
  },
}
</script>

<style >
.tab-bar-item{
  flex:1;
  text-align: center;
  height: 49px;

  font-size:14px;
}

.tab-bar-item img{
  height:24px;
  width:24px;
  
  
}

.active{
   color:red;
}
</style>
