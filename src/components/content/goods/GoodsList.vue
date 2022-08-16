<template>
  <div class="goods">
    <goods-list-item
      v-for="(item, index) in goods"
      :goods-item="item"
      :key="index"
    >
    </goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem.vue";

export default {
  name: "GoodsList",
  components: {
    GoodsListItem,
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
<style scoped>
.goods {
  /* 
  设置两行item，需在子元素设置宽度，goodsListItem给了width为48%
   */
  display: flex;
  flex-wrap: wrap;
  /* 让两个item间隙均匀 */
  justify-content: space-evenly;

  /* padding: 2px; */
}
</style>