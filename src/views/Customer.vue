<template>
  <v-container v-if="$route.path === '/customer'" grid-list-xs>
    <v-layout align-start justify-center row wrap>
      <v-flex xs12>
        <v-card elevation="0">
          <v-container pt-3 pr-3 pl-3 pb-0>
            <h2>Customers</h2>
            <p>Yahan new customer add karen.</p>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" to="/customer/new">Add Customer</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout align-start justify-center row wrap>
      <v-flex xs12 mt-2>
        <v-container
          mt-2
          pa-0
          v-for="(customer, index) in Object.keys(customerList)"
          :key="index"
          @click="customerInfoSelected(customerList[customer])"
        >
          <v-card elevation="1">
            <v-card-title>
              {{ customerList[customer].name }}
              <v-spacer></v-spacer>
              {{ customerList[customer].tani }}
            </v-card-title>
          </v-card>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
  <router-view v-else @submit="onNewCustSubmit"></router-view>
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
</style>
