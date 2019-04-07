import Vue from "vue";
import Vuex from "vuex";

import userAuthModule from "./userAuthModule";
import stockModule from "./stockModule";
import customerModule from "./customerModule";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    userAuthModule: userAuthModule,
    stockModule: stockModule,
    customerModule: customerModule
  }
});

export default store;
