<template>
  <!-- 
  此处ref定义别名是为了下面的BScroll肯定拿到的是这个组件对象
  如果直接document.querrySelector(".wrapper")，那么拿到的是第一个wrapper，可能首页上一层有wrapper，就会出现bug
 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
    };
  },

  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {});
  },
};
</script>
<style scoped>
</style>