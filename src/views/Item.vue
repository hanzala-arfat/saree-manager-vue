<template>
  <v-container grid-list-xs>
    <v-layout align-start justify-center wrap row>
      <v-flex xs12>
        <v-card elevation="0">
          <v-container pa-3>
            <h2>Materials</h2>
            <p>Yahan materials k stock ko manage karen.</p>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout align-start justify-center wrap row>
      <v-flex mt-2>
        <v-container mt-2 pa-0 v-for="(item, index) in itemList" :key="index">
          <v-card elevation="1">
            <v-card-title primary-title>
              <div>
                <div class="headline">{{item.name}}</div>
                <span class="grey--text">{{item.description}}</span>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <router-link :to="'/item/' + item.name.toLowerCase()">
                <v-btn flat color="primary">Manage</v-btn>
              </router-link>
            </v-card-actions>
          </v-card>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Item",
  data() {
    return {
      itemList: [
        {
          name: "Zari",
          description: "Zari ko stock me add karne k liye yahan click karen."
        },
        {
          name: "Cone",
          description: "Cone ko stock me add karne k liye yahan click karen."
        },
        {
          name: "Saree",
          description: "Saree ka stock manage krne ke liye yahan click karen."
        }
      ]
    };
  }
};
</script>

<style>
</style>

