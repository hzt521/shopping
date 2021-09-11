<template>
<!-- ref指定对象 -->
     <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      // 并非所有都需要实时监听滚动，上拉加载，所有默认值为0和false
      probeType: {
        type: Number,
        default: 0
      },
      // scrollEnd: {
      //   type: Boolean,
      //   default: false
      // }
    },
    data() {
      return {
        scroll: null,
  
      }
    },

    mounted() {
      // 1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        observeImage:true,
        observeDOM:true,
        probeType: this.probeType,
        
      })


      //2.监听 滚动 的位置
      this.scroll.on('scroll',(position)=>{
        //console.log(position);
        //将position传出去
        this.$emit('scroll', position)
      })


      //3.监听 上拉加载 事件
      this.scroll.on('scrollEnd',()=>{
        if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              //console.log("上拉加载更多");
              //将scrollToEnd事件传出去
              this.$emit('scrollToEnd')
             } 
      })

    },
    methods: {
      //多长时间滚动到哪
      scrollTo(x,y,time=300){
        this.scroll.scrollTo(x,y,time)
      },
      //获取y的位置
      getScrollY(){
        return this.scroll.y 
      },
      refresh() {
  //    代理better-scroll的refresh方法
         this.scroll && this.scroll.refresh()
       },
      
    },
  }
</script>

<style scoped>

</style>



