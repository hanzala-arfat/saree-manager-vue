<template>
  <!-- <div class="addcustomer-page">
    <div class="container">
      <div class="title-bar">
        <button
          class="btn btn-dark btn-sm"
          @click="goBack"
          style="font-weight:bold;  font-size: 14px"
        >
          <i class="fas fa-arrow-left"/>
        </button>
        <h4>Fill Customer Details</h4>
      </div>
    </div>
    <div class="container form-container">
      <form>
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            class="form-control"
            id="name"
            placeholder="Enter Name"
            v-model="customer.name"
          >
          <small class="form-text text-muted">We'll never share your Details with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="phoneNo">Phone Number</label>
          <input
            type="number"
            class="form-control"
            id="phoneNo"
            placeholder="Enter Phone No"
            v-model="customer.phone"
          >
        </div>
        <div class="form-group">
          <label for="category">Category</label>
          <input
            type="text"
            class="form-control"
            id="category"
            placeholder="Enter type of saree"
            v-model="customer.category"
          >
        </div>
        <button type="submit" class="btn btn-primary" @click.prevent="submitNewCustomer">Submit</button>
      </form>
    </div>
  </div>-->
  <v-container>
    <v-layout align-start justify-start row wrap class="mt-3">
      <v-flex xs12>
        <v-card elevation="0">
          <v-card-title class="pa-1">
            <v-btn flat icon class="ma-0" @click="goBack">
              <v-icon>arrow_left</v-icon>
            </v-btn>
            <h4>Fill Customer Details</h4>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    <v-divider class="ma-2"></v-divider>
    <v-layout align-start justify-center row wrap class="mt-1">
      <v-flex xs12>
        <v-text-field
          label="Enter Customer Name"
          v-model="customer.name"
          outline
          required
          autofocus
        ></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field label="Enter Customer Phone No." v-model="customer.phone" outline required></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field label="Enter Customer Type" v-model="customer.category" outline required></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout align-end justify-end row>
      <v-btn color="primary" @click.prevent="submitNewCustomer">Done</v-btn>
    </v-layout>
  </v-container>
</template>


<script>
import firebase from "firebase";
export default {
  name: "AddCustomer",
  data() {
    return {
      customer: {
        name: "",
        phone: "",
        category: ""
      }
    };
  },

  methods: {
    goBack() {
      this.$router.go(-1);
      this.$emit("submit"); //start event without argument
    },
    submitNewCustomer() {
      this.$store
        .dispatch("addNewCustomer", { newCustomer: this.customer })
        .then(() => {
          console.log("Customer successfuly added");
          this.$router.go(-1);
          this.$emit("submit");
        })
        .catch(err => {
          console.log("Customer adding error", err);
        });
    }
  }
};
</script>

<style scoped>
</style>
