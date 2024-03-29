import Vue from 'vue'
import App from './App.vue'

// ? 1导入路由
import router from './router'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

new Vue({
  router,
  render: h => h(App),

}).$mount('#app')
