<template>
  <v-container grid-list-xs>
    <v-layout align-start justify-center wrap row>
      <v-flex xs12>
        <v-card elevation="0">
          <v-container pt-3 pr-3 pl-3 pb-0>
            <h2>Cone</h2>
            <p>Yahan cone k stock ko manage karen.</p>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click.stop="dialog=true">Add Cone</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-layout align-start justify-center wrap row>
        <v-flex xs12 mt-2>
          <v-container mt-2 pa-0 v-for="(cone, index) in coneList" :key="index">
            <v-card elevation="1">
              <v-card-title>
                {{ cone.name }}
                <v-spacer></v-spacer>
                {{ cone.weight }} Kg.
              </v-card-title>
            </v-card>
          </v-container>
        </v-flex>
      </v-layout>
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title>
            <h4>Add Cone</h4>
          </v-card-title>
          <v-card-text>
            <v-container pa-0 ma-0 grid-list-xs>
              <v-layout align-start justify-center wrap>
                <v-flex xs12>
                  <v-text-field
                    label="Cone Colour"
                    v-model="newCone.name"
                    outline
                    required
                    autofocus
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Cone Weight" v-model="newCone.weight" outline required></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat="flat" @click="dialog = false">Close</v-btn>
            <v-btn color="green darken-1" flat="flat" @click="addNewCone">Done</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>



<script>
import { mapGetters } from "vuex";
export default {
  name: "ItemCone",
  data() {
    return {
      dialog: false,
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
      this.dialog = false;
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
</style>
