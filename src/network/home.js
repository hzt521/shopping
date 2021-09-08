import {request} from "./request.js"

//封装所有首页所需要的数据请求，以后首页都面向home.js开发
//getHomeMultidata函数拿到的是request函数的返回值（即promise)
export function getHomeMultidata(){
  return request({
    url:'/home/multidata'//这个接口里包含一些数据
  })
}


export function getHomeData(type,page){
  //type和page是必传参数
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}