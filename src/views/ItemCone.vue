<template>
  <div class="item-cone-page">
    <div class="container">
      <div class="title-bar">
        <h2>Cone</h2>
        <p>Yahan cone k stock ko manage karen.</p>

        <button
          type="button"
          class="btn btn-primary btn-sm"
          data-toggle="modal"
          data-target="#exampleModalCenter"
        >+ Add Cone</button>
      </div>
    </div>
    <div class="container">
      <ul class="list-group">
        <li class="list-group-item" v-for="(cone, index) in coneList" :key="index">
          <p style="font-weight:650">
            {{ cone.name }}
            <span style="float:right; font-weight:350">{{ cone.weight }} Kg.</span>
          </p>
        </li>
      </ul>
    </div>
    <div
      class="modal fade"
      id="exampleModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Add Cone</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Enter Cone Colour."
                v-model="newCone.name"
              >
              <input
                type="text"
                class="form-control"
                placeholder="Enter Weight."
                v-model="newCone.weight"
                autofocus
                required
              >
              <div class="input-group-append">
                <button
                  class="btn btn-dark btn-sm"
                  type="button"
                  @click.prevent="addNewCone"
                  data-dismiss="modal"
                >Add</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import firebase from "firebase";
export default {
  name: "ItemCone",
  data() {
    return {
      coneList: [],
      newCone: { name: "", weight: "" },
      userID: undefined
    };
  },
  async mounted() {
    let self = this;
    await firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        self.userID = user.uid;
        window.userID = user.uid;
        console.log(self.userID);
      } else {
        // No user is signed in.
        console.log("Not logged in -> Item/Cone");
      }
    });
    if (this.userID) {
      let db = firebase.firestore(); // data base leke list show karna
      db.collection("users")
        .doc(this.userID)
        .get()
        .then(function(doc) {
          if (doc.exists) {
            let data1 = doc.data().stock.cone;
            for (var key in data1) {
              //console.log(key + data1[key]);
              var element = {};
              element = { name: key, weight: data1[key] }; //element objeect me leke fir coneList push
              self.coneList.push(element); // kar ke show kiya
            }
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
    addNewCone() {
      self = this;
      let db = firebase.firestore();
      db.collection("users")
        .doc(this.userID)
        .set(
          {
            stock: {
              cone: {
                [this.newCone.name]: this.newCone.weight
              }
            }
          },
          { merge: true }
        )
        .then(function() {
          console.log("Document successfully written!");
          self.coneList.push(self.newCone);
          self.newCone = { name: "", weight: "" };
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    }
  }
};
</script>



<style scoped>
/* p{
    margin: 0;
} */
</style>
