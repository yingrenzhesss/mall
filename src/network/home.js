import { request } from "./request";

//todo 1.轮播图接口
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

// todo 2.商品数据接口
export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}