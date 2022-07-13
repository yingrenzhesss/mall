<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- <img src="../../assets/img/tabbar/home.svg" alt="" />
    <div>首页</div> -->
    <!-- 1.封装组件，以插槽替代图片和文字 -->
    <!-- 2.注意：此处用div包裹slot是因为要使v-if和v-else与active起效果，因为app.vue文件的替换内容会直接替换一整个slot
    如果把判定属性什么的写在slot里，会一整个被替换，导致等于没写，所以建议用div包裹起来，养成习惯-->
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>
<script>
export default {
  name: "TabBarItem",
  props: {
    // ? 父传子的路由路径，想要给活跃路由的颜色，用户自己传，不写死颜色
    path: String,
    activeColor: {
      type: String,
      default: "red",
    },
  },
  data() {
    return {
      // isActive: true,
    };
  },
  computed: {
    isActive() {
      // ! indexOf() == -1表示没找到，取反表示找到，当前活跃路由与props的path相同，即找到
      return this.$route.path.indexOf(this.path) !== -1;
    },
    // ! 动态绑定style属性，假如路由活跃，给他（活跃的tab-bar-item）设定用户传入的颜色值，否则给个默认{}，即不设置，会调用props的default=red
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  methods: {
    itemClick() {
      // console.log(this.path);
      // 解决重复点击 
      if (this.$route.path == this.path) return;
      this.$router.push(this.path);
    },
  },
};
</script>
<style scoped>
/* tabbar的小组件样式 */
.tab-bar-item {
  flex: 1;

  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  margin-bottom: 2px;
  /* 图片与文字紧贴（针对悍内元素和行内块） */
  vertical-align: middle;
}
</style>