一. HomeFeature

     独立组件封装HomeFeateur

     div>a>img
  
二.TabControl
 
     独立组件的封装
 
     props->titles
 
     div>根据titles v-for 便利div ->span(显示遍历出来的title）
 
     css相关
 
     选中哪一个tab,哪一个的文字就会变颜色，下面border-bottom
 
         currentIndex
    
 三.首页商品数据的请求
 
   3.1先设计数据结构，保存好数据
   
     goods{
   
      pop:page/list
 
      new:page/list
 
      sell:page/list
   
      }
    
   3.2发送数据请求
    
     在home.js中封装getHomeData(type,page)
     
     在Home.vue中，又在methods中getHomeData(type)
     
     调用getHomeData("pop")/getHomeData("new")/getHomeData("sell")
     
        page:动态的获取对应的page
        
     获取到数据：res
      
        this.goods[type].list.push(...res.data.list)   ...意味着可以传多个参数
        
        this.goods[type].page +=1
        
        goods{
   
            pop:page1/list[30]
 
            new:page1/list[30]
 
            sell:page1/list[30]
   
          }
 
 四.对商品数据进行展示
   
   4.1封装GoodList.vue组件
   
        props:goods->list[30]
     
        v-for goods ->GoodsListItem[30]
     
        GoodsListItem(组件）-> GoodsItem(数据)
     
   4.2.封装GoodListItem.vue组件
   
        props:goodsItem
     
        goodsItem取出数据，并且使用正确的div/span/img等基本标签进行展示
     
五.对滚动进行重构

   5.1.better-scroll使用
   
       const bscroll =new BScroll(加载的DOM对象, { })
   
       注意：wrapper ->content -> 很多内容
       
       1.监听滚动
      
           probeType:0/1/2(手指滚动)/3(只要是滚动)
         
           bscroll.on("scroll",(position)=>{})
         
       2.上拉加载
      
          scrollEnd -> scrollToEnd
          
       3.click:false时botton可以点击，div不可以
      
   5.2在vue项目中使用better-scroll
    
        对better-scroll进行封装：Scroll.vue
       
        Home.vue和Scroll.vue进行通信
       
            Home.vue将probeType设置为3
          
            Scroll.vue需要通过$emit实时将事件发送到Home.vue
            
 六.回到顶部BackTop
 
   6.1对BackTop组件的封装
   
       只有一张图片
       
    6.2如何监听组件的点击
    
      vue2不可以，必须添加修饰.native
      
      cli4可以直接监听
      
      回到顶部
      
         scroll对象，scroll.scrollTo(x,y,time）
         
         this.$refs.scroll.scrollTo(0,0,500)
         
    6.3.BackTop组件的显示和隐藏
    
      isShowBackTop:false
      
      监听滚动，拿到滚动的位置：
      
        -position.y>1000 -> isShowBackTop:true
        
        isShowBackTop = -position.y>1000
    
    
         
         
      
     
       
    
 
   
          
          
    
      
      
   
   
   
   
