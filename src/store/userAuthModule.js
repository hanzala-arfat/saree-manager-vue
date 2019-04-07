import { auth, db } from "@/firebase";
import router from "../router";

export default {
  state: {
    userID: undefined,
    userName: undefined,
    isAuthenticated: false
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated;
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
    setUserName(state, payload) {
      state.userName = payload;
    },
    setAuth(state, payload) {
      state.isAuthenticated = payload;
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
    sendOtp(_, { phoneNumber }) {
      auth()
        .signInWithPhoneNumber(phoneNumber, window.recaptchaVerifier)
        .then(function(confirmationResult) {
          window.confirmationResult = confirmationResult;
        })
        .catch(function(error) {
          console.log("OTP sending failed: " + error);
          router.replace("/login");
        });
    },
    verifyOtp({ commit }, { otp }) {
      window.confirmationResult
        .confirm(otp)
        .then(result => {
          commit("setUserID", result.user.uid);
          commit("setAuth", true);
          router.replace("/profile");
        })
        .catch(error => {
          console.log("Wrong Verfication Code", error);
          router.replace("/login");
        });
    },
    setUserName({ state, commit }, { enteredName }) {
      db.collection("users")
        .doc(state.userID)
        .set(
          {
            profile: {
              name: enteredName
            }
          },
          {
            merge: true
          }
        )
        .then(function() {
          commit("setUserName", enteredName);
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    },
    getUserName({ state, commit }) {
      if (!state.userName) {
        db.collection("users")
          .doc(state.userID)
          .get()
          .then(doc => {
            if (doc.exists) {
              commit("setUserName", doc.data().profile.name);
            } else {
              console.log("No such document!");
            }
          })
          .catch(error => {
            console.log("Error getting document:", error);
          });
      }
    },
    logout({ commit }) {
      auth()
        .signOut()
        .then(() => {
          console.log("Signed Out");
          // window.localStorage.removeItem("userID");
          commit("setUserID", undefined);
          commit("setAuth", false);
          router.replace("/login");
        })
        .catch(error => {
          console.error("Sign Out Error", error);
        });
    }
  }
};
