<template>
  <div class="Profile-page">
    <div class="container">
      <!-- <div class="title-bar">
        <h2>Profile</h2>
      </div>-->
      <div class="profile mt-5">
        <img src="@/assets/profile.png" class="rounded mb-3" alt="Cinque Terre">
        <div v-if="username">
          <p class="h2">{{username}}</p>
          <button
            class="btn btn-lg btn-primary btn-block mt-1"
            type="submit"
            @click.prevent="logout"
          >Logout</button>
        </div>

        <div v-else>
          <input
            type="text"
            id="name"
            class="form-control"
            placeholder="Enter Name"
            required
            autofocus
          >
          <button
            class="btn btn-lg btn-primary btn-block mt-3"
            type="submit"
            @click.prevent="save"
          >Save</button>
        </div>

        <p class="mt-5 mb-3 text-muted">&copy; 2018-2019</p>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Profile",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["isAuthenticated", "username"])
  },
  mounted() {
    if (this.isAuthenticated && !this.username) {
      this.$store.dispatch("getUserName");
    }
  },
  methods: {
    saveUsername() {
      if (document.getElementById("name").value) {
        this.username = document.getElementById("name").value;
        this.$store.dispatch("setUserName", { enteredName: this.username });
      } else {
        console.log("Enter Valid Name");
      }
    },
    ...mapActions(["logout"])
  }
};
</script>

<style scoped>
.profile {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.rounded {
  width: 40%;
  max-width: 175px;
}
</style>
