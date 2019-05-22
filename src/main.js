import Vue from "vue";
import App from "./App.vue";
import store from "./store/store";
import router from "./router";
import "./firebase";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify, {
  iconfont: "fa" // 'md' || 'mdi' || 'fa' || 'fa4'
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
