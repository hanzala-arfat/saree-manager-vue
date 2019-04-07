<template>
  <div class="login-page">
    <div class="container">
      <div class="login" v-if="!otpSent">
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
            @click.prevent="checkValidNumber"
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
          <button
            class="btn btn-lg btn-primary btn-block mt-3"
            :class="{ 'disable':disableDoneBtn }"
            @click.prevent="verifyOtp"
          >Done</button>
          <p class="mt-5 mb-3 text-muted">&copy; 2018-2019</p>
        </form>
      </div>
      <div id="recaptcha-container"></div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      otpSent: false,
      phone: "",
      otp: "",
      disableDoneBtn: false
    };
  },
  mounted() {
    this.$store.dispatch("initializeReCaptcha");
  },
  methods: {
    checkValidNumber() {
      if (this.phone.toString().length >= 10) {
        this.phone.toString().length === 10
          ? (this.phone = "+91" + this.phone.toString())
          : (this.phone = this.phone.toString());
        this.otpSent = true;
        this.$store.dispatch("sendOtp", { phoneNumber: this.phone });
      } else {
        console.log("Number not valid");
      }
    },
    verifyOtp() {
      this.disableDoneBtn = true;
      if (this.otp.toString().length === 6) {
        this.$store.dispatch("verifyOtp", { otp: this.otp });
      } else {
        console.log("Enter 6 digit number.");
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

