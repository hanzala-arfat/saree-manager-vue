import { db } from "@/firebase";

export default {
  state: {
    stock: {}
  },
  getters: {
    zariList(state) {
      let list = [];
      for (let typeofzari in state.stock.Zari) {
        list.push({
          name: typeofzari,
          weight: state.stock.Zari[typeofzari]
        });
      }
      return list;
    },
    coneList(state) {
      let list = [];
      for (let typeofcone in state.stock.Cone) {
        list.push({
          name: typeofcone,
          weight: state.stock.Cone[typeofcone]
        });
      }
      return list;
    },
    coneTypes(state) {
      return state.stock.Cone || {};
    },
    zariTypes(state) {
      return state.stock.Zari || {};
    }
  },
  mutations: {
    setTotalStockData(state, payload) {
      state.stock = payload;
    }
  },
  actions: {
    getTotalStockData({ commit, rootState }) {
      db.collection("Stock")
        .doc(rootState.userAuthModule.userID)
        .onSnapshot(snapshot => {
          if (snapshot.exists) commit("setTotalStockData", snapshot.data());
        });
    },
    setSpecificStockData({ rootState }, { typeofstock, newStockData }) {
      return new Promise((resolve, reject) => {
        const userID = rootState.userAuthModule.userID;
        const stockRef = db.collection("Stock").doc(userID);
        stockRef
          .set(
            {
              [typeofstock]: {
                [newStockData.name]:
                  (parseFloat(newStockData.weight) * 100) / 100
              }
            },
            {
              merge: true
            }
          )
          .then(() => {
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
};
