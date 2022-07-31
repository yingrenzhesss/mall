<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      :key="index"
      class="tab-control-item"
      :class="{ active: index === currentIndex }"
      @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "TabControl",

  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  data() {
    return {
      currentIndex: 0,
    };
  },

  methods: {
    itemClick(index) {
      this.currentIndex = index;
    },
  },
};
</script>
<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 15px;

  background-color: #fff;
  height: 40px;
  /* line-height可以继承，也可以放到下面的子item里 */
  line-height: 40px;
}
.tab-control-item {
  flex: 1;
}
.tab-control-item span {
  padding: 5px;
}
.active {
  color: var(--color-high-text);
}
/* 给选中的分类标题一个下划线 */
.active span {
  border-bottom: 3px solid var(--color-tint);
}
</style>