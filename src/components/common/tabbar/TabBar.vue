<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "TabBar",
};
</script>
<style scoped>
#tab-bar {
  /* 1.display属性 */
  display: flex;

  /* 2.position定位属性 */
  /* 将tabbar放到手机下面 */
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  /* 3.基本设置 */
  /* 给tabbar上边线调加阴影 */
  box-shadow: 0px -1px 1px rgba(100, 100, 100, 0.3);

  /* 4.背景设置 */
  background-color: #f6f6f6;
}
</style>