import Vue from "vue";
import App from "./App.vue";
import firebase from "firebase";

var config = {
  apiKey: "AIzaSyCgpV_fJ6jFUQcbBaOtQ00n_rUc6y0cq40",
  authDomain: "saree-manager-vue.firebaseapp.com",
  databaseURL: "https://saree-manager-vue.firebaseio.com",
  projectId: "saree-manager-vue",
  storageBucket: "saree-manager-vue.appspot.com",
  messagingSenderId: "601196583561"
};
firebase.initializeApp(config);

import router from "./router";

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
