<template>
  <div class="goodslistitem">
    <img :src="goodsItem.show.img" alt="" >
    <div class="goodsinfo">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default{
  name:'GoodsListItem',
  components:{
   },
   props:{
     goodsItem:{
       type:Array,
       default(){
         return []
       }
     }
   },
  data(){
    return{
    }
  }
  
}
</script>

<style scoped>
.goodslistitem{
  /* 子绝父相 */
  padding-bottom: 40px;
  position: relative;
  width: 46%; 
}
.goodslistitem img{
  width: 100%;
  /* 圆角 */
  border-radius: 5px;
  
}

.goodsinfo{
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0px;
  right: 0px;
  overflow: hidden;
  text-align: center;
}
.goodsinfo p{
  /* 文本溢出时使用省略号 */
  overflow: hidden;
  text-overflow: ellipsis;
  /* 规定文本不进行换行 */
  white-space: nowrap;
  margin-bottom: 3px;
}
.goodsinfo .price{
  color:var(--color-high-text);
  margin-right: 20px;
}
.goodsinfo .collect{
  position: relative;
}
.goodsinfo .collect::before{
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}

</style>
