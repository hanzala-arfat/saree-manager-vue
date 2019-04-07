import firebase, { auth, firestore } from "firebase/app";
import store from "./store/store";

const config = {
  apiKey: "AIzaSyCgpV_fJ6jFUQcbBaOtQ00n_rUc6y0cq40",
  authDomain: "saree-manager-vue.firebaseapp.com",
  databaseURL: "https://saree-manager-vue.firebaseio.com",
  projectId: "saree-manager-vue",
  storageBucket: "saree-manager-vue.appspot.com",
  messagingSenderId: "601196583561"
};
firebase.initializeApp(config);

const db = firestore();

auth().onAuthStateChanged(async user => {
  if (user) {
    store.commit("setUserID", user.uid);
    store.commit("setAuth", true);
    await store.dispatch("getProfileInfo");
    store.dispatch("checkRole");
    if (!store.getters.isWorker) {
      store.dispatch("getCustomerList");
      store.dispatch("getTotalStockData");
    }
  } else {
    store.commit("setUserID", undefined);
    store.commit("setAuth", false);
  }
});

export { firebase, db, auth };
