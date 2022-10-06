<template>
  <div id="detail">
    <detail-nav-bar />
    <detail-swiper :top-images="topImages" />
  </div>
</template>
<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";

import { getDetail } from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
  },
  data() {
    return {
      iid: null,
      topImages: [],
    };
  },
  created() {
    // 1.保存请求的商品id
    this.iid = this.$route.params.iid;
    // 2.根据id请求商品数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
      this.topImages = res.data.result.itemInfo.topImages;
    });
  },
};
</script>
<style scoped>
</style>