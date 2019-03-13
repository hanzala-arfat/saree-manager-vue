<template>
  <div class="setting">
    <div class="container">
      <!-- <div class="title-bar">
        <h2>Profile</h2>
      </div>-->
      <div class="profile mt-5">
        <img src="@/assets/profile.png" class="rounded mb-3" alt="Cinque Terre">
        <p class="h2" v-if="myName">{{myName}}</p>
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
// let firebase = require('firebase')  // old syntax
export default {
  name: "Setting",
  data() {
    return {
      myName: "",
      userID: undefined
    };
  },
  mounted() {
    let self = this;
    this.userID = firebase.auth().currentUser.uid;
    let db = firebase.firestore();
    db.collection("users")
      .doc(this.userID)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          self.myName = doc.data().profile.name;
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
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
