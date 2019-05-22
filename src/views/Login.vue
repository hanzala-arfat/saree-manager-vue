<template>
  <v-container grid-list-xs>
    <v-layout align-start justify-center row fill-height wrap>
      <v-flex xs10 mt-5 v-if="!otpSent">
        <v-form ref="form" v-model="valid" lazy-validation>
          <h3 class="text-xs-center">Sign In</h3>
          <v-text-field
            v-model="phone"
            :counter="10"
            :rules="phoneRules"
            label="Phone Number"
            required
          ></v-text-field>
          <div class="text-xs-center">
            <v-btn :disabled="!valid" color="primary" @click.prevent="checkValidNumber">Proceed</v-btn>
          </div>
        </v-form>
      </v-flex>
      <v-flex xs10 mt-5 v-else>
        <v-form ref="form2" v-model="valid" lazy-validation>
          <h3 class="text-xs-center">Verify OTP</h3>
          <v-text-field v-model="otp" :counter="6" :rules="otpRules" label="Enter OTP" required></v-text-field>
          <div class="text-xs-center">
            <v-btn :disabled="disableDoneBtn" color="primary" @click.prevent="verifyOtp">Done</v-btn>
          </div>
        </v-form>
      </v-flex>
      <div id="recaptcha-container"></div>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      valid: true,
      otpSent: false,
      phone: "",
      otp: "",
      disableDoneBtn: false,
      phoneRules: [
        v => !!v || "Phone Number is required",
        v =>
          (v && v.length === 10) || "Name must not be more than 10 characters"
      ],
      otpRules: [
        v => !!v || "OTP is required",
        v => (v && v.length === 6) || "Otp must not be more than 10 characters"
      ]
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
</style>

