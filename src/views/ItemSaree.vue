<template>
  <v-container grid-list-xs>
    <v-layout align-start justify-center wrap row>
      <v-flex>
        <v-card elevation="0">
          <v-container pt-3 pr-3 pl-3 pb-0>
            <h2>Saree</h2>
            <p>Yahan Saree k stock ko manage karen.</p>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click.stop="dialog=true">Add Saree</v-btn>
          </v-card-actions>
        </v-card>
        <v-flex mt-2>
          <v-container mt-2 pa-0 v-for="(saree, index) in sareeList" :key="index">
            <v-card elevation="1">
              <v-card-title>
                {{ saree.name }}
                <v-spacer></v-spacer>
                {{ saree.pcs }} Units
              </v-card-title>
            </v-card>
          </v-container>
        </v-flex>
      </v-flex>
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title>
            <h4>Add Saree</h4>
          </v-card-title>
          <v-card-text>
            <v-container pa-0 ma-0 grid-list-xs>
              <v-layout align-start justify-center wrap>
                <v-flex xs12>
                  <v-text-field
                    label="Saree Colour"
                    v-model="newSaree.name"
                    outline
                    required
                    autofocus
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Saree Pieces" v-model="newSaree.pcs" outline required></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat="flat" @click="dialog = false">Close</v-btn>
            <v-btn color="green darken-1" flat="flat" @click="addNewSaree">Done</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>



<script>
export default {
  name: "ItemSaree",
  data() {
    return {
      dialog: false,
      sareeList: [{ name: "Tanchuiya", pcs: 14 }],
      newSaree: { name: "", pcs: "" }
    };
  },
  methods: {
    addNewSaree() {
      this.dialog = false;
      this.sareeList.push(this.newSaree);
      this.newSaree = { name: "", pcs: "" };
    }
  }
};
</script>



<style scoped>
</style>
