<template>
  <div class="tab-control">
   <div  class="tab-control-item" v-for= "(item,index) in titles" :key="index" 
   :class="{active:index === currentIndex}"
   @click="itemClick(index)">
     <span>{{item}}</span>
   </div>
  </div>
</template>

<script>
export default{
  name:'TabControl',
  props:{
    // titles是控制栏里文字数组
    titles:{
      type: Array,
      default(){
        return[]
      }
    }
  },
  components:{
   },
  data(){
    return{
      //记录当前谁被选中
      currentIndex:0

    }
  },
  methods: {
    
    itemClick(index){
      //将当前点击的index换成currentIndex,实现下红线功能
      this.currentIndex=index;

      //向外传事件
      this.$emit('tabClick',index);

    }
  },
}
</script>

<style scoped>
.tab-control{
  display:flex;
  text-align: center;

  position: sticky;
  top: 44px;
  z-index: 9;

  font-size: 15px;
  background-color: #fff;
}
.tab-control-item{
  flex:1;
  height: 40px;
  line-height: 40px;
}
.active{
color: var(--color-high-text);

}
.active span{
  border-bottom: solid 2px var(--color-high-text);
  padding: 5px;
}

</style>
