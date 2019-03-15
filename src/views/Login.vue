<template>
  <div class="login-page">
    <div class="container">
      <div class="login" v-if="!bol">
        <form class="form-signin">
          <h3 class="h3 mb-3 font-weight-normal align-center">Sign In</h3>
          <label for="inputEmail" class="sr-only">Phone Number</label>
          <input
            type="number"
            id="inputEmail"
            class="form-control"
            placeholder="Phone number"
            :maxlength="13"
            v-model="phone"
            required
            autofocus
          >
          <button
            id="sign-in-button"
            class="btn btn-lg btn-primary btn-block mt-3"
            type="submit"
            @click.prevent="sendOtp"
          >Proceed</button>
          <p class="mt-5 mb-3 text-muted">&copy; 2018-2019</p>
        </form>
      </div>

      <div v-else>
        <form class="form-otp">
          <h3 class="h3 mb-3 font-weight-normal align-center">OTP page</h3>
          <label for="otp" class="sr-only">OTP Number</label>
          <input
            type="number"
            id="otp"
            class="form-control"
            placeholder="OTP number"
            v-model="otp"
            required
            autofocus
          >
          <button class="btn btn-lg btn-primary btn-block mt-3" :class="{ 'disabled':disable }" type="submit" @click="enterOtp">Done</button>
          <p class="mt-5 mb-3 text-muted">&copy; 2018-2019</p>
        </form>
      </div>
      <div id="recaptcha-container"></div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Login",
  data() {
    return {
      bol: false,
      phone: "",
      otp: "",
      disable:false
    };
  },
  mounted() {
    firebase.auth().useDeviceLanguage();
    let self = this;
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: function(response) {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
          console.log("recaptcha Successful");
        },
        "expired-callback": function() {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        }
      }
    );
    window.recaptchaVerifier.render().then(function(widgetId) {
      window.recaptchaWidgetId = widgetId;
    });
  },
  methods: {
    sendOtp() {
      this.bol = true;
      let self = this;
      var phoneNumber = this.phone;
      var appVerifier = window.recaptchaVerifier;
      if (phoneNumber.toString().length >= 10) {
        phoneNumber.toString().length === 10
          ? (phoneNumber = "+91" + phoneNumber.toString())
          : (phoneNumber = phoneNumber.toString());
        firebase
          .auth()
          .signInWithPhoneNumber(phoneNumber, appVerifier)
          .then(function(confirmationResult) {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
          })
          .catch(function(error) {
            // Error; SMS not sent
            // ...
            console.log("OTP sending failed: " + error);
            window.recaptchaVerifier.render().then(function(widgetId) {
              grecaptcha.reset(widgetId);
            });
          });
      } else {
        console.log("Number not valid");
      }
    },
    enterOtp() {
      this.disable=true;
      let self = this;
      let enteredOtp = this.otp;
      if (enteredOtp.toString().length === 6) {
        window.confirmationResult
          .confirm(enteredOtp)
          .then(function(result) {
            // User signed in successfully.
            var user = result.user;
            self.$router.push("/profile");
            // ...
          })
          .catch(function(error) {
            // User couldn't sign in (bad verification code?)
            // ...

            console.log("Wrong Verfication Code");
            self.disable= false;
          });
      }
    }
  }
};
</script>

<style scoped>
.container {
  width: 65%;
}
.h3 {
  margin-top: 25%;
  text-align: center;
}
</style>

