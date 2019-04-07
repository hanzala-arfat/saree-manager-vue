import { firebase, db } from "@/firebase";

export default {
  state: {
    customerList: undefined,
    currentTaniData: {}
  },
  getters: {
    customerList(state) {
      return state.customerList;
    },
    customerData(state) {
      return customerID => state.customerList[customerID];
    },
    currentTaniData(state) {
      return customerID => state.currentTaniData[customerID] || {};
    }
  },
  mutations: {
    setCustomerList(state, payload) {
      state.customerList = payload;
    },
    setCustomerTaniData(state, payload) {
      state.currentTaniData[payload.id] = payload.data;
    }
  },
  actions: {
    getCustomerList({ commit, rootState }) {
      db.collection(`Workers`)
        .doc(rootState.userAuthModule.userID)
        .onSnapshot(snapshot => {
          commit("setCustomerList", snapshot.data());
        });
    },
    addNewCustomer({ rootState }, { newCustomer }) {
      return new Promise((resolve, reject) => {
        const newTaniDoc = db.collection("TaniData").doc();
        const newUserDoc = db.collection("Users").doc();
        newTaniDoc.set({
          active: true,
          initiated_at: firebase.firestore.FieldValue.serverTimestamp(),
          data_of: newCustomer.phone
        });
        newUserDoc.set({
          is_worker: true,
          created_at: firebase.firestore.FieldValue.serverTimestamp(),
          name: newCustomer.name,
          phone_number: "+91" + newCustomer.phone
        });
        db.collection("Roles")
          .doc()
          .set(
            {
              phone_number: "+91" + newCustomer.phone,
              role: "Worker"
            },
            {
              merge: true
            }
          );
        db.collection("Workers")
          .doc(rootState.userAuthModule.userID)
          .set(
            {
              [newUserDoc.id]: {
                ...newCustomer,
                doc_id: newUserDoc.id,
                current_tani_id: newTaniDoc.id
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
    },
    getCustomerTaniData({ state, commit }, { customerID }) {
      return new Promise((resolve, reject) => {
        const tani_id = state.customerList[customerID].current_tani_id;
        db.collection("TaniData")
          .doc(tani_id)
          .onSnapshot(doc => {
            if (doc.exists) {
              commit("setCustomerTaniData", {
                id: customerID,
                data: doc.data().data
              });
              resolve();
            } else {
              reject();
              console.log("Cannot get tani data.");
            }
          });
      });
    },
    setCurrentTaniData(
      { state, rootState },
      { customerID, date, newData, syncData }
    ) {
      return new Promise((resolve, reject) => {
        const tani_id = state.customerList[customerID].current_tani_id;
        const userID = rootState.userAuthModule.userID;
        const stockRef = db.collection("Stock").doc(userID);
        const taniDataRef = db.collection("TaniData").doc(tani_id);
        db.runTransaction(transaction => {
          return transaction
            .get(stockRef)
            .then(stockDoc => {
              for (let stock in syncData) {
                for (let typeofstock in syncData[stock]) {
                  let syncedValue =
                    stockDoc.data()[stock][typeofstock] -
                    syncData[stock][typeofstock];
                  syncedValue = parseFloat(parseFloat(syncedValue).toFixed(2));
                  //set stock first
                  transaction.set(
                    stockRef,
                    {
                      [stock]: {
                        [typeofstock]: syncedValue
                      }
                    },
                    {
                      merge: true
                    }
                  );
                  //set tani data
                  transaction.set(
                    taniDataRef,
                    {
                      data: {
                        [date.today]: {
                          ...newData,
                          created_at: firebase.firestore.FieldValue.serverTimestamp()
                        }
                      }
                    },
                    {
                      merge: true
                    }
                  );
                }
              }
            })
            .then(() => {
              resolve();
              console.log("Successfully added tani data.");
            })
            .catch(err => {
              console.log(err);
              reject(err);
            });
        });
      });
    }
  }
};
