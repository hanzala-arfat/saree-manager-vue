<template>
  <v-bottom-nav :active.sync="activeBtn" :value="showNav" fixed dark>
    <router-link to="/dashboard">
      <v-btn flat color="white">
        <span>Dashboard</span>
        <v-icon>home</v-icon>
      </v-btn>
    </router-link>
    <router-link to="/item">
      <v-btn flat color="white">
        <span>Materials</span>
        <v-icon>favorite</v-icon>
      </v-btn>
    </router-link>
    <router-link to="/customer">
      <v-btn flat color="white">
        <span>Customers</span>
        <v-icon>place</v-icon>
      </v-btn>
    </router-link>
    <router-link to="/profile">
      <v-btn flat color="white">
        <span>Profile</span>
        <v-icon>settings</v-icon>
      </v-btn>
    </router-link>
  </v-bottom-nav>
</template>


<script>
export default {
  name: "Sidebar",
  data() {
    return {
      activeBtn: 0,
      showNav: true
    };
  },
  methods: {},
  computed: {
    activeRoute() {
      return this.$route.name;
    }
  }
};
</script>


<style scoped>
a {
  text-decoration: none !important;
}
.v-bottom-nav {
  position: fixed;
  bottom: 0;
}

@media (max-width: 768px) {
}
</style>


