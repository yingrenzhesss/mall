<template>
  <div id="home">
    <!-- 1.导航栏 -->
    <nav-bar class="home-nav">
      <template v-slot:center>购物街</template>
    </nav-bar>
    <!-- 解决bscroll滚动，所以在此处复制一份 -->
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    />

    <!-- BScroll包裹滚动 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @position="contentScroll"
      :pull-up-load="true"
      @pullingUp="lodeMore"
    >
      <!-- 2.轮播图  -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <!-- 3.推荐 -->
      <recommend-view :recommends="recommends" />
      <!-- 4.本周类型图片 -->
      <feature-view />
      <!-- 5.三个小分类  class="tab-control"因为加入bscoll，所以去掉-->
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      />
      <!-- 6.商品展示 -->
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>
<script>
// todo 首页子组件
// 导入轮播图
import HomeSwiper from "./childComps/HomeSwiper";
// 导入推荐
import RecommendView from "./childComps/RecommendView.vue";
// 导入本周流行
import FeatureView from "./childComps/FeatureView.vue";

// todo 公共组件
// 导入导航栏组件
import NavBar from "components/common/navbar/NavBar";
// 导入3个小分类组件
import TabControl from "components/content/tabControl/TabControl.vue";
// 导入商品组件
import GoodsList from "components/content/goods/GoodsList.vue";
// 导入滚动组件BetterScroll
import Scroll from "components/common/scroll/Scroll.vue";
// 导入返回顶部组件backTop
import BackTop from "components/content/backTop/BackTop.vue";

// todo 其他方法
// 导入网络请求接口
import { getHomeMultidata, getHomeGoods } from "network/home";
// 导入工具函数
import { debounce } from "common/utils.js";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,

    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      // 请求的数据保存在此
      // 1.轮播图数据
      banners: [],
      // 2.推荐数据
      recommends: [],
      // 3.商品数据
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      // 4.设置首页默认展示类型，下面方法根据index改类型
      currentType: "pop",

      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  // 解决路由跳转，返回首页页面不变
  // deactivated记录位置，activated滚动到指定位置
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh(); //bs问题，不刷新会出错
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
    // console.log(this.saveY);
  },

  created() {
    // 1.请求多个数据---轮播图与推荐
    this.getHomeMultidata();
    // 2.请求三类商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },

  mounted() {
    // 1.图片加载完成的事件监听
    // 使用防抖函数
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    // 监听图片是否加载完成，解决BetterScroll的bug,事件总线需在main.js添加vue实例,不然bus为空
    this.$bus.$on("itemImageLoad", () => {
      // 当监听到图片加载完成调用refresh刷新scrollHeight高度
      // 接上面后续，使用防抖后
      refresh();
    });

    // 2.获取tabControl的offsetTop
    // 所有的组件都有一个属性$el --> 用于获取组件中的元素
    // console.log(this.$refs.tabControl.$el.offsetTop);
    // this.tabOffsetTop = this.$refs.tabControl;
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },

  methods: {
    /**
     * *事件监听相关方法
     */
    // 监听类型点击并切换
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 监听滚动到顶部，获取scroll组件的滚动方法，传入位置参数0，0，即最顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    // 监听指定的位置，当大于1000的时候显示顶部功能
    contentScroll(position) {
      // 1.判断backTop是否显示
      this.isShowBackTop = -position.y > 1000;
      // 2.决定tabControl是否吸顶(position: fixed)
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    // 监听到滚动到底部时，加载更多图片
    lodeMore() {
      this.getHomeGoods(this.currentType);
    },
    // 监听轮播图图片加载完成，为了获取正确的offsetTop
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      // console.log(this.tabOffsetTop);
    },

    /**
     **网络请求相关方法
     */
    //! 将网络请求多包装一层，使created更加清晰
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      //（只是获取页码）此处type是三类标题数据，page是页码，为了方法复用，所以先获取page，原页码是0，此处+1
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        // 保存数据,运用扩展运算符，将一个数组赋值给另一个数组
        this.goods[type].list.push(...res.data.data.list);
        // * 将goods页码+1
        this.goods[type].page += 1;
        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>



<style scoped>
/* 给导航栏一个位置触发下面的定位 */
#home {
  /* 导航栏高度是44px ,后面设置bscroll需要确定视口高度，所以要注释掉*/
  /* padding-top: 44px; */

  /* vh视口高度，即屏幕可见高度 */
  height: 100vh;
}
/* 首页导航栏背景颜色 + 文字颜色 */
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* 固定在顶部 ,在我们使用浏览器原生滚动时，为了不使导航一起滚*/
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
/* 让三个分类可以固定住,固定在44px导航栏下（滚动的时候），后面会使用BetterScroll替换 */
/* .tab-control {
  position: sticky;
  top: 44px;
  /* 为了让下面的图片不盖住三个标题 */
/* z-index: 9;
} */
/* .fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
} */

/* 滚动区域定位方案2,去除掉导航栏和底部tabbar */
.content {
  /* height: 300px; */
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/* 滚动区域定位方案1 */
/* .content{
  /* 计算滚动高度 */
/* height: calc(100% - 93px); */
/* overflow: hidden; */
/* 上面设置好滚动高度，为了从导航栏下面开始滚动，所以得撑开导航栏高度44px */
/* margin-top: 44px; }
  */

/* 解决bscoll下三类标题吸顶 */
.tab-control {
  position: relative;
  z-index: 9;
}
</style>
