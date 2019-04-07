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
                type="number"
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
import { mapGetters } from "vuex";
export default {
  name: "ItemCone",
  data() {
    return {
      newCone: { name: "", weight: 0 }
    };
  },
  computed: {
    ...mapGetters(["userID", "coneList"])
  },
  beforeMount() {
    if (!this.coneList.length) {
      this.$store.dispatch("getTotalStockData");
    }
  },
  methods: {
    addNewCone() {
      this.coneList.forEach(cone => {
        if (cone.name === this.newCone.name) {
          this.newCone.weight =
            parseFloat(this.newCone.weight) + parseFloat(cone.weight);
        }
      });

      this.$store
        .dispatch("setSpecificStockData", {
          typeofstock: "Cone",
          newStockData: this.newCone
        })
        .then(() => {
          console.log("Document successfully written.");
          this.newCone = { name: "", weight: 0 };
        })
        .catch(error => {
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
