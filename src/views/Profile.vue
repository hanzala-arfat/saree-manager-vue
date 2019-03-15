<template>
  <div class="Profile-page">
    <div class="container">
      <!-- <div class="title-bar">
        <h2>Profile</h2>
      </div>-->
      <div class="profile mt-5">
        <img src="@/assets/profile.png" class="rounded mb-3" alt="Cinque Terre">
        <div v-if="myName">
          <p class="h2">{{myName}}</p>
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
import firebase from "firebase"; // new syntax
// let firebase = require('firebase')  // old syntax
export default {
  name: "Profile",
  data() {
    return {
      myName: "",
      userID: undefined
    };
  },
  async mounted() {
    // data lena db se
    let self = this; // this self var me bas rakha gaya h
    let a = await firebase.auth().onAuthStateChanged(user => {
      if (user) {
        self.userID = user.uid;
      } else {
        console.log("Not logged in -> Profile");
      }
    });
    if (this.userID) {
      let db = firebase.firestore();
      db.collection("users")
        .doc(this.userID)
        .get()
        .then(function(doc) {
          if (doc.exists) {
            self.myName = doc.data().profile.name; // myName par db se user name inislize hua h
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
    } else {
      console.log("user undefined");
    }
  },
  methods: {
    save() {
      // data push
      this.myName = document.getElementById("name").value; // name ki value
      let db = firebase.firestore(); // yahan se data push hota hai
      db.collection("users")
        .doc(this.userID)
        .set({
          profile: {
            name: this.myName
          }
        })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    },
    logout() {
      let self = this;
      firebase
        .auth()
        .signOut()
        .then(
          function() {
            console.log("Signed Out");
            self.$router.push("/login");
          },
          function(error) {
            console.error("Sign Out Error", error);
          }
        );
    }
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
