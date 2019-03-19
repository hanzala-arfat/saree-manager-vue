<template>
  <div class="item-zari-page">
    <div class="container">
      <div class="title-bar">
        <h2>Zari</h2>
        <p>Yahan zari k stock ko manage karen.</p>
        <button
          type="button"
          class="btn btn-primary btn-sm"
          data-toggle="modal"
          data-target="#exampleModalCenter"
        >+ Add Zari</button>
      </div>
    </div>
    <div class="container">
      <ul class="list-group">
        <li class="list-group-item" v-for="(zari, index) in zariList" :key="index">
          <p style="font-weight:650">
            {{ zari.name }}
            <span style="float:right; font-weight:350">{{ zari.weight }} Kg.</span>
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
            <h5 class="modal-title" id="exampleModalLongTitle">Add Zari</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Enter Zari Colour."
                v-model="newZari.name"
                autofocus
                required
              >
              <input
                type="text"
                class="form-control"
                placeholder="Enter Weight."
                v-model="newZari.weight"
                required
              >
              <div class="input-group-append">
                <button
                  class="btn btn-dark btn-sm"
                  type="submit"
                  @click.prevent="addNewZari"
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
  name: "ItemZari",
  data() {
    return {
      userID: window.localStorage.getItem("userID"),
      zariList: [],
      newZari: { name: "", weight: "" } //puh
    };
  },
  async mounted() {
    let self = this; // this self var me bas rakha gaya h
    if (this.userID) {   
      let db = firebase.firestore(); // data base leke list show karna
      db.collection("users")
        .doc(this.userID)
        .get()
        .then(function(doc) {
          if (doc.exists) {
            // self.name = doc.data().profile.name;
            let data1 = doc.data().stock.zari;
            for (var key in data1) {
              //console.log(key + data1[key]);

              var element = {};
              element = { name: key, weight: data1[key] };
              self.zariList.push(element);
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
    addNewZari() {
      // data push
      let self = this;
      let db = firebase.firestore(); // yahan se data push hota hai
      db.collection("users")
        .doc(this.userID)
        .set(
          {
            stock: {
              zari: {
                [this.newZari.name]: this.newZari.weight
              }
            }
          },
          { merge: true } // overwrite nhi hoga
        )
        .then(function() {
          console.log("Document successfully written!");
          self.zariList.push({
            name: self.newZari.name,
            weight: self.newZari.weight
          });
          self.newZari = { name: "", weight: "" };
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    }

    // this.zariList.push(this.newZari);
    // this.newZari = { name: '', weight: ''}
  }
};
</script>



<style scoped>
/* p{
    margin: 0;
} */
</style>
