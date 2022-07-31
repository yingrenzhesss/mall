<template>
  <swiper>
    <swiper-item v-for="item in banners" :key="item.title">
      <a :href="item.link">
        <img :src="item.image" alt="" />
      </a>
    </swiper-item>
  </swiper>
</template>
<script>
//! 导入轮播图组件，自己去看懂老师写的组件轮子
import { Swiper, SwiperItem } from "components/common/swiper";
// import Swiper from "components/common/swiper/Swiper.vue";
// import SwiperItem from "components/common/swiper/SwiperItem.vue";
export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
};
</script>
<style scoped>
</style>