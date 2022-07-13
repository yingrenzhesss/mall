//todo 1.导入axios
import axios from 'axios'

//todo 2.创建网络请求request函数
export function request(config) {
  //? 1.创建实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/hy66/',
    timeout: 5000
  })

  //? 2.网络拦截
  //*2.1请求拦截
  axios.interceptors.request.use(
    config => {
      // console.log(res);
      return config
    },
    err => {
      // console.log(err);
    }
  )
  //*2.2响应拦截
  axios.interceptors.response.use(
    res => {
      return res.data
    },
    err => {
      // console.log(err);
    }
  )

  //todo 3.发送网络请求
  return instance(config)
}