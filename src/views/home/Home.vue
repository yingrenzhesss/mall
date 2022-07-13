<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>购物街</template>
    </nav-bar>
  </div>
</template>
<script>
// 导入导航栏组件
import NavBar from "components/common/navbar/NavBar";
// 导入网络请求接口
import { getHomeMultidata } from "network/home";
//! 导入轮播图组件，自己去看懂老师写的组件
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "Home",
  components: {
    NavBar,
    Swiper,
    SwiperItem,
  },
  data() {
    return {
      banners: [],
      recommends: [],
    };
  },
  created() {
    // 1.请求多个数据
    getHomeMultidata().then((res) => {
      console.log(res);
      this.banners = res.data.data.banner.list;
      this.recommends = res.data.data.recommend.list;
    });
  },
};
</script>



<style scoped>
/* 首页导航栏背景颜色 + 文字颜色 */
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
