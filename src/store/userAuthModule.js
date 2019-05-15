import { firebase, auth, db } from "@/firebase";
import router from "../router";

export default {
  state: {
    userID: undefined,
    userName: undefined,
    phoneNumber: undefined,
    isAuthenticated: false,
    is_worker: false
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
    isWorker(state) {
      return state.is_worker;
    },
    userID(state) {
      return state.userID;
    },
    username(state) {
      return state.userName;
    }
  },
  mutations: {
    otpSent(state, payload) {
      state.otpSent = payload;
    },
    setUserID(state, payload) {
      state.userID = payload;
    },
    setPhoneNumber(state, payload) {
      state.phoneNumber = payload;
    },
    setUserName(state, payload) {
      state.userName = payload;
    },
    setAuth(state, payload) {
      state.isAuthenticated = payload;
    },
    setWorker(state, payload) {
      state.is_worker = payload;
    }
  },
  actions: {
    initializeReCaptcha() {
      auth().useDeviceLanguage();
      window.recaptchaVerifier = new auth.RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            console.log("recaptcha Successful");
          },
          "expired-callback": () => {
            console.log("recaptcha expired");
          }
        }
      );
      window.recaptchaVerifier.render().then(function(widgetId) {
        window.recaptchaWidgetId = widgetId;
      });
    },
    sendOtp({ commit }, { phoneNumber }) {
      auth()
        .signInWithPhoneNumber(phoneNumber, window.recaptchaVerifier)
        .then(function(confirmationResult) {
          window.confirmationResult = confirmationResult;
          commit("setPhoneNumber", phoneNumber);
        })
        .catch(function(error) {
          console.log("OTP sending failed: " + error);
          router.replace("/login");
        });
    },
    verifyOtp({ dispatch, commit }, { otp }) {
      window.confirmationResult
        .confirm(otp)
        .then(result => {
          commit("setUserID", result.user.uid);
          commit("setAuth", true);
          dispatch("checkRole");
        })
        .catch(error => {
          console.log("Wrong Verfication Code", error);
          router.replace("/login");
        });
    },
    checkRole({ state, commit, dispatch }) {
      db.collection("Roles")
        .where("phone_number", "==", state.phoneNumber)
        .where("role", "==", "Worker")
        .get()
        .then(async snapshot => {
          if (snapshot.empty) {
            if (state.userName) {
              router.replace("/dashboard");
            } else {
              commit("setWorker", false);
              router.replace("/profile");
            }
          } else {
            commit("setWorker", true);
            await dispatch("getProfileInfo");
            if (!state.userName) {
              await dispatch("setWorkerUID");
              await dispatch("getProfileInfo");
            }
          }
        });
    },
    async setWorkerUID({ state }) {
      db.collection("Users")
        .where("phone_number", "==", state.phoneNumber)
        .get()
        .then(snapshot => {
          if (!snapshot.empty) {
            snapshot.docs[0].ref
              .set(
                {
                  uid: state.userID
                },
                {
                  merge: true
                }
              )
              .then(function() {
                console.log("User ID for Worker updated!!");
              })
              .catch(function(error) {
                console.error("Error writing document: ", error);
              });
          }
        });
    },
    setProfileInfo({ state, commit }, { enteredName }) {
      db.collection("Users")
        .doc()
        .set(
          {
            name: enteredName,
            created_at: firebase.firestore.FieldValue.serverTimestamp(),
            uid: state.userID,
            phone_number: state.phoneNumber,
            is_worker: state.is_worker
          },
          {
            merge: true
          }
        )
        .then(function() {
          commit("setUserName", enteredName);
          console.log("Profile name updated!!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    },
    getProfileInfo({ state, commit }) {
      return new Promise((resolve, reject) => {
        if (state.userID) {
          db.collection("Users")
            .where("uid", "==", state.userID)
            .get()
            .then(snapshot => {
              if (!snapshot.empty) {
                commit("setUserName", snapshot.docs[0].data().name);
                commit("setPhoneNumber", snapshot.docs[0].data().phone_number);
                commit("setWorker", snapshot.docs[0].data().is_worker);
                console.log("Profile name retrieved!!");
                resolve();
              } else {
                console.log("No name found!");
              }
            })
            .catch(error => {
              console.log("Error getting document:", error);
              reject(error);
            });
        }
      });
    },
    logout({ commit }) {
      auth()
        .signOut()
        .then(() => {
          console.log("Signed Out");
          commit("setUserID", undefined);
          commit("setUserName", undefined);
          commit("setAuth", false);
          commit("setWorker", false);
          commit("setPhoneNumber", undefined);
          router.replace("/login");
        })
        .catch(error => {
          console.error("Sign Out Error", error);
        });
    }
  }
};
