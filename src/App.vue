<template>
  <div id="app">
    <Navbar/>
    <div class="row">
      <Sidebar v-if="loged"></Sidebar>
      <router-view class="views col-md-10"/>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import firebase from "firebase";

export default {
  components: {
    Navbar,
    Sidebar
  },
  data() {
    return {
      loged: false
    };
  },
  beforeMount() {
    let self = this;
    firebase.auth().onAuthStateChanged(function() {
      self.loged = window.localStorage.getItem("userID");
    });
  }
};
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.btn:focus,
.btn:active {
  outline: none !important;
  box-shadow: none !important;
}

.row {
  margin: 0;
}

@media (max-width: 768px) {
  .navbar {
    position: fixed;
    top: 0;
  }
  .views {
    margin: 8vh auto;
  }
}
</style>
