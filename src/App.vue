<template>
  <v-app id="app">
    <Navbar/>
    <v-container pt-0 pr-0 pl-0 pb-5 grid-list-xs>
      <v-layout align-start justify-center row fill-height wrap>
        <v-flex>
          <Sidebar v-if="isAuthenticated && !isWorker"></Sidebar>
          <router-view/>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import firebase from "firebase";
import { mapGetters } from "vuex";

export default {
  components: {
    Navbar,
    Sidebar
  },
  computed: {
    ...mapGetters(["isAuthenticated", "isWorker"])
  }
};
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-height: 100vh;
}

@media (max-width: 768px) {
}
</style>
