<template>
  <v-container>
    <v-layout align-start justify-center row wrap>
      <v-flex xs12>
        <v-card elevation="0">
          <v-container pt-3 pr-3 pl-3 pb-0>
            <h2>{{ customerData.name }}</h2>
            <p>Customer Details for Tani</p>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click.stop="dialog=true">Add Details</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <TaniDataList :taniData="currentTaniData"/>
    <v-dialog v-model="dialog" max-width="420">
      <v-card>
        <v-card-title>
          <h4>Add Details</h4>
        </v-card-title>
        <v-card-text>
          <v-container pa-0 ma-0 grid-list-xs>
            <v-layout align-start justify-center row wrap>
              <v-flex xs6>
                <v-text-field
                  label="Enter weight of zari."
                  v-model="newData.zari.weight"
                  outline
                  required
                  autofocus
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-combobox
                  outline
                  v-model="newData.zari.type"
                  :items="Object.keys(zariTypes)"
                  label="Select type of zari"
                  required
                ></v-combobox>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  label="Enter weight of cone."
                  v-model="newData.cone.weight"
                  outline
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-combobox
                  outline
                  v-model="newData.cone.type"
                  :items="Object.keys(coneTypes)"
                  label="Select type of cone"
                  required
                ></v-combobox>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Enter amount." v-model="newData.money" outline required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Enter saree count." v-model="newData.saree" outline required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click="dialog = false">Close</v-btn>
          <v-btn color="green darken-1" flat="flat" @click="addNewData">Done</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import TaniDataList from "@/components/TaniDataList.vue";

export default {
  name: "CustomerInfo",
  components: {
    TaniDataList
  },
  data() {
    return {
      dialog: false,
      newData: {
        saree: 0,
        cone: { type: "Cone", weight: 0 },
        zari: { type: "Zari", weight: 0 },
        money: 0,
        date: undefined
      },
      currentTaniData: {},
      date: {},
      stockSyncData: {}
    };
  },
  computed: {
    customerData() {
      return this.$store.getters.customerData(this.$route.params.id);
    },
    ...mapGetters(["coneTypes", "zariTypes"])
  },
  async beforeMount() {
    this.setTodaysDate();
    this.$store
      .dispatch("getCustomerTaniData", {
        customerID: this.$route.params.id
      })
      .then(() => {
        this.currentTaniData = this.$store.getters.currentTaniData(
          this.$route.params.id
        );
      });
  },
  methods: {
    addNewData() {
      if (this.validateForm()) {
        this.dialog = false;
        this.newData.date = this.date.today;

        try {
          if (this.newData.zari.type != "Zari" && this.newData.zari.weight) {
            this.stockSyncData.Zari = {
              [this.newData.zari.type]: parseFloat(this.newData.zari.weight)
            };
            this.newData.zari = {
              [this.newData.zari.type]: parseFloat(this.newData.zari.weight)
            };
          } else {
            delete this.newData.zari;
          }
          if (this.newData.cone.type != "Cone" && this.newData.cone.weight) {
            this.stockSyncData.Cone = {
              [this.newData.cone.type]: parseFloat(this.newData.cone.weight)
            };
            this.newData.cone = {
              [this.newData.cone.type]: parseFloat(this.newData.cone.weight)
            };
          } else {
            delete this.newData.cone;
          }
        } catch (error) {
          console.log(error);
        }

        if (this.currentTaniData[this.date.today]) {
          this.newData.saree =
            parseFloat(this.newData.saree) +
            parseFloat(this.currentTaniData[this.date.today].saree);
          this.newData.money =
            parseFloat(this.newData.money) +
            parseFloat(this.currentTaniData[this.date.today].money);

          if (this.newData.cone) {
            for (let type in this.currentTaniData[this.date.today].cone) {
              if (this.newData.cone[type]) {
                this.newData.cone[type] =
                  parseFloat(this.newData.cone[type]) +
                  parseFloat(this.currentTaniData[this.date.today].cone[type]);
                this.newData.cone[type] = parseFloat(
                  this.newData.cone[type].toFixed(2)
                );
              }
            }
          }

          if (this.newData.zari) {
            for (let type in this.currentTaniData[this.date.today].zari) {
              if (this.newData.zari[type]) {
                this.newData.zari[type] =
                  parseFloat(this.newData.zari[type]) +
                  parseFloat(this.currentTaniData[this.date.today].zari[type]);
                this.newData.zari[type] = parseFloat(
                  this.newData.zari[type].toFixed(2)
                );
              }
            }
          }
        }

        this.$store
          .dispatch("setCurrentTaniData", {
            customerID: this.$route.params.id,
            date: this.date,
            newData: this.newData,
            syncData: this.stockSyncData
          })
          .then(() => {
            console.log("Data added successfully");
            this.newData = {
              saree: 0,
              cone: { type: "Cone", weight: 0 },
              zari: { type: "Zari", weight: 0 },
              money: 0,
              date: undefined
            };
          })
          .catch(err => {
            console.log("Data adding error", err);
          });
      } else {
        alert("Not submited value");
      }
    },
    validateForm() {
      if (
        this.newData.saree ||
        this.newData.money ||
        (this.newData.zari &&
          0 <
            this.newData.zari.weight <
            this.zariTypes[this.newData.zari.type]) ||
        (this.newData.cone &&
          0 < this.newData.cone.weight < this.coneTypes[this.newData.cone.type])
      ) {
        return true;
      }
      return false;
    },
    setTodaysDate() {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1; //January is 0!
      var yyyy = today.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      today = dd + "-" + mm + "-" + yyyy;
      this.date.today = today;
      this.date.day = dd;
      this.date.month = mm;
      this.date.year = yyyy;
    }
  }
};
</script>

<style scoped>
</style>
