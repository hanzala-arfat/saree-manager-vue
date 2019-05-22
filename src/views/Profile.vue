<template>
  <!-- <div class="Profile-page">
    <div class="container">
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
            @click.prevent="saveUsername"
          >Save</button>
        </div>

        <p class="mt-5 mb-3 text-muted">&copy; 2018-2019</p>
      </div>
    </div>
  </div>-->
  <v-container>
    <v-layout align-start justify-center row wrap v-if="username">
      <v-flex xs5>
        <v-img src="/static/profile.png" class="mb-3 d-block" alt="Cinque Terre"></v-img>
      </v-flex>
      <v-flex xs12>
        <div class="h2 d-block text-xs-center">{{username}}</div>
      </v-flex>
      <v-flex xs12>
        <div class="text-xs-center">
          <v-btn id="name" color="primary" @click="logout">Logout</v-btn>
        </div>
      </v-flex>
    </v-layout>
    <v-layout align-start justify-center row wrap v-else>
      <v-flex xs5>
        <v-img src="/static/profile.png" class="mb-3 d-block" alt="Cinque Terre"></v-img>
      </v-flex>
      <v-flex xs8 offset-xs-2>
        <v-text-field id="name" label="Enter Name" required outline></v-text-field>
      </v-flex>
      <v-flex xs12>
        <div class="text-xs-center">
          <v-btn color="primary">Save</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
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
  methods: {
    saveUsername() {
      if (document.getElementById("name").value) {
        this.$store.dispatch("setProfileInfo", {
          enteredName: document.getElementById("name").value
        });
      } else {
        console.log("Enter Valid Name");
      }
    },
    ...mapActions(["logout"])
  }
};
</script>

<style scoped>
</style>
