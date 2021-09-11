<template>
  <div class="goodslist">
   <goods-list-item  
   class="goodslistitem" 
   v-for= "(item,index) in goods" :key="index" 
   :goodsItem="item"
   @click="imageClick"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from 'components/content/goods/GoodsListItem'

export default{
  name:'GoodsList',
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    GoodsListItem,
   },
  data(){
    return{
    }
  },
  methods: {
    imageClick(){
      console.log('跳转到详情页')
    }
  },
}
</script>

<style scoped>
.goodslist{
  /* 使得一行展示两个商品 */
  /* 让弹性盒元素在必要的时候拆行 */
  display: flex;
  flex-wrap: wrap;

  /* 使剩下的宽度8%均等分 */
  justify-content:space-evenly;

  margin-top:10px;
}

</style>
