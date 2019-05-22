<template>
  <v-container grid-list-xs>
    <v-layout align-start justify-center wrap row>
      <v-flex>
        <v-card elevation="0">
          <v-container pt-3 pr-3 pl-3 pb-0>
            <h2>Zari</h2>
            <p>Yahan zari k stock ko manage karen.</p>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click.stop="dialog=true">Add Zari</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title>
            <h4>Add Zari</h4>
          </v-card-title>
          <v-card-text>
            <v-container pa-0 ma-0 grid-list-xs>
              <v-layout align-start justify-center wrap>
                <v-flex xs12>
                  <v-text-field
                    label="Zari Colour"
                    v-model="newZari.name"
                    outline
                    required
                    autofocus
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Zari Weight" v-model="newZari.weight" outline required></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat="flat" @click="dialog = false">Close</v-btn>
            <v-btn color="green darken-1" flat="flat" @click="addNewZari">Done</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-layout align-start justify-center wrap row>
      <v-flex xs12 mt-2>
        <v-container mt-2 pa-0 v-for="(zari, index) in zariList" :key="index">
          <v-card elevation="1">
            <v-card-title>
              {{ zari.name }}
              <v-spacer></v-spacer>
              {{ zari.weight }} Kg.
            </v-card-title>
          </v-card>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";

export default {
  name: "ItemZari",
  data() {
    return {
      newZari: { name: "", weight: 0 },
      dialog: false
    };
  },
  computed: {
    ...mapGetters(["userID", "zariList"])
  },
  beforeMount() {
    if (!this.zariList.length) {
      this.$store.dispatch("getTotalStockData");
    }
  },
  methods: {
    addNewZari() {
      this.dialog = false;
      this.zariList.forEach(zari => {
        if (zari.name === this.newZari.name) {
          this.newZari.weight =
            parseFloat(this.newZari.weight) + parseFloat(zari.weight);
        }
      });

      this.$store
        .dispatch("setSpecificStockData", {
          typeofstock: "Zari",
          newStockData: this.newZari
        })
        .then(() => {
          console.log("Document successfully written.");
          this.newZari = { name: "", weight: 0 };
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
