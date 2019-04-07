<template>
  <div class="customer-page">
    <div v-if="$route.path === '/customer'">
      <div class="container">
        <div class="title-bar">
          <h2>Customers</h2>
          <p>Yahan new customer add karen.</p>
          <router-link to="/customer/new">
            <button type="button" class="btn btn-primary btn-sm">+ Add Customer</button>
          </router-link>
        </div>
      </div>
      <div class="container">
        <ul class="list-group" v-if="customerList">
          <li
            class="list-group-item"
            v-for="(customer, index) in Object.keys(customerList)"
            :key="index"
            @click="customerInfoSelected(customerList[customer])"
          >
            <p style="font-weight:650">
              {{ customerList[customer].name }}
              <span
                style="float:right; font-weight:350"
              >{{ customerList[customer].tani }}</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
    <router-view v-else @submit="onNewCustSubmit"></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Customer",
  data() {
    return {
      childActive: false
    };
  },
  computed: {
    ...mapGetters(["customerList"])
  },
  methods: {
    onNewCustSubmit(custData) {
      if (custData) this.customerList.push(custData);
    },
    customerInfoSelected(customer) {
      this.childActive = true;
      this.$router.push({ path: `/customer/${customer.doc_id}` });
    }
  }
};
</script>



<style scoped>
li {
  cursor: pointer;
}
</style>
