<template>
  <div class="addcustomer-page">
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
  </div>
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
.title-bar {
  padding: 12px 24px;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
}
h4 {
  margin: 0;
  margin-left: 12px;
  font-size: 1.4rem;
}
.btn {
  padding: 2px 6px;
}
.form-container {
  width: 60%;
}
@media (max-width: 768px) {
  .form-container {
    width: 100%;
  }
}
</style>
