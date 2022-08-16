<template>
  <div id="home">
    <!-- 1.导航栏 -->
    <nav-bar class="home-nav">
      <template v-slot:center>购物街</template>
    </nav-bar>
    <!-- 2.轮播图  -->
    <home-swiper :banners="banners" />
    <!-- 3.推荐 -->
    <recommend-view :recommends="recommends" />
    <!-- 4.本周类型图片 -->
    <feature-view />
    <!-- 5.三个小分类 -->
    <tab-control
      class="tab-control"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
    />
    <!-- 6.商品展示 -->
    <goods-list :goods="showGoods" />
    <ul>
      <li>1name</li>
      <li>2name</li>
      <li>3name</li>
      <li>4name</li>
      <li>5name</li>
      <li>6name</li>
      <li>7name</li>
      <li>8name</li>
      <li>9name</li>
      <li>10name</li>
      <li>11name</li>
      <li>12name</li>
      <li>13name</li>
      <li>14name</li>
      <li>15name</li>
      <li>16name</li>
      <li>17name</li>
      <li>18name</li>
      <li>19name</li>
      <li>20name</li>
      <li>21name</li>
      <li>22name</li>
      <li>23name</li>
      <li>24name</li>
      <li>25name</li>
      <li>26name</li>
      <li>27name</li>
      <li>28name</li>
      <li>29name</li>
      <li>30name</li>
      <li>31name</li>
      <li>32name</li>
      <li>33name</li>
      <li>34name</li>
      <li>35name</li>
      <li>36name</li>
      <li>37name</li>
      <li>38name</li>
      <li>39name</li>
      <li>40name</li>
      <li>41name</li>
      <li>42name</li>
      <li>43name</li>
      <li>44name</li>
      <li>45name</li>
      <li>46name</li>
      <li>47name</li>
      <li>48name</li>
      <li>49name</li>
      <li>50name</li>
      <li>51name</li>
      <li>52name</li>
      <li>53name</li>
      <li>54name</li>
      <li>55name</li>
      <li>56name</li>
      <li>57name</li>
      <li>58name</li>
      <li>59name</li>
      <li>60name</li>
      <li>61name</li>
      <li>62name</li>
      <li>63name</li>
      <li>64name</li>
      <li>65name</li>
      <li>66name</li>
      <li>67name</li>
      <li>68name</li>
      <li>69name</li>
      <li>70name</li>
      <li>71name</li>
      <li>72name</li>
      <li>73name</li>
      <li>74name</li>
      <li>75name</li>
      <li>76name</li>
      <li>77name</li>
      <li>78name</li>
      <li>79name</li>
      <li>80name</li>
      <li>81name</li>
      <li>82name</li>
      <li>83name</li>
      <li>84name</li>
      <li>85name</li>
      <li>86name</li>
      <li>87name</li>
      <li>88name</li>
      <li>89name</li>
      <li>90name</li>
      <li>91name</li>
      <li>92name</li>
      <li>93name</li>
      <li>94name</li>
      <li>95name</li>
      <li>96name</li>
      <li>97name</li>
      <li>98name</li>
      <li>99name</li>
      <li>100name</li>
    </ul>
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

// todo 其他方法
// 导入网络请求接口
import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,

    NavBar,
    TabControl,
    GoodsList,
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
    };
  },
  created() {
    // 1.请求多个数据---轮播图与推荐
    this.getHomeMultidata();
    // 2.请求三类商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },

  methods: {
    /**
     * 事件监听相关方法
     */
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
    },

    //网络请求相关方法
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
      });
    },
  },
};
</script>



<style scoped>
/* 给导航栏一个位置触发下面的定位 */
#home {
  /* 导航栏高度是44px */
  padding-top: 44px;
}
/* 首页导航栏背景颜色 + 文字颜色 */
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* 固定在顶部 */
  position: fixed;
  left: 0;
  right: 0;
  top: 0;

  z-index: 9;
}
/* 让三个分类可以固定住,固定在44px导航栏下（滚动的时候），后面会使用BetterScroll替换 */
.tab-control {
  position: sticky;
  top: 44px;
  /* 为了让下面的图片不盖住三个标题 */
  z-index: 9;
}
</style>
