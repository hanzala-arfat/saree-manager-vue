<template>
  <div class="container">
    <div class="title-bar">
      <h2>{{ customerData.name }}</h2>
      <p>Customer Details for Tani</p>
      <button
        type="button"
        class="btn btn-primary btn-sm"
        data-toggle="modal"
        data-target="#addNewDataModal"
      >
        <i class="fas fa-scroll"></i> Add Details
      </button>
    </div>
    <div class="accordion" id="accordionExample" v-if="currentTaniData">
      <div class="card" v-for="(key, index) in Object.keys(currentTaniData)" :key="index">
        <div class="card-header" :id="index">
          <h2 class="mb-0">
            <button
              class="btn font-weight-bold"
              type="button"
              data-toggle="collapse"
              :data-target="'#no'+ index "
              aria-expanded="true"
              :aria-controls="'no' + index "
            >Date {{currentTaniData[key].date}}</button>
          </h2>
        </div>

        <div
          :id="'no'+ index"
          class="collapse"
          :aria-labelledby="index"
          data-parent="#accordionExample"
        >
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li class="list-group-item detail" v-if="currentTaniData[key].tani">
                <i class="fas fa-chevron-right"></i>
                &nbsp;Tani: {{currentTaniData[key].tani}}
              </li>

              <li class="list-group-item" v-if="currentTaniData[key].cone">
                <p
                  class="detail mb-0"
                  v-for="(typeofcone, i) in Object.keys(currentTaniData[key].cone)"
                  :key="i"
                >
                  <i class="fas fa-chevron-right"></i>
                  &nbsp;
                  {{typeofcone}} - Cone : {{currentTaniData[key].cone[typeofcone]}} Kg
                </p>
              </li>

              <li class="list-group-item detail" v-if="currentTaniData[key].saree">
                <i class="fas fa-chevron-right"></i>
                &nbsp;Saree Details: {{currentTaniData[key].saree}}
              </li>

              <li class="list-group-item" v-if="currentTaniData[key].zari">
                <p
                  class="detail mb-0"
                  v-for="(typeofzari, i) in Object.keys(currentTaniData[key].zari)"
                  :key="i"
                >
                  <i class="fas fa-chevron-right"></i>
                  &nbsp;
                  {{typeofzari}} - Zari : {{currentTaniData[key].zari[typeofzari]}} Kg
                </p>
              </li>

              <li class="list-group-item detail" v-if="currentTaniData[key].money">
                <i class="fas fa-chevron-right"></i>
                &nbsp;Money: {{currentTaniData[key].money}}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="addNewDataModal" tabindex="1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add Details</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <div class="input-group flex-nowrap">
              <input
                type="number"
                class="form-control"
                placeholder="Enter weight of cone"
                aria-label="Enter weight of cone"
                aria-describedby="addon-wrapping"
                v-model="newData.cone.weight"
              >
              <div class="input-group-append">
                <select v-model="newData.cone.type" class="btn btn-dark">
                  <option selected>Cone</option>
                  <option
                    v-for="(select, index) in Object.keys(coneTypes)"
                    :key="index"
                    :value="select"
                  >{{select}}</option>
                </select>
              </div>
            </div>
            <small
              class="form-text text-muted mb-3"
            >Enter weight between 0Kg and {{coneTypes[newData.cone.type] || 0}}Kg</small>

            <div class="input-group flex-nowrap">
              <input
                type="number"
                class="form-control"
                placeholder="Enter weight of zari"
                aria-label="Enter weight of zari"
                aria-describedby="addon-wrapping"
                v-model="newData.zari.weight"
              >
              <div class="input-group-append">
                <select v-model="newData.zari.type" class="btn btn-dark">
                  <option selected>Zari</option>
                  <option
                    v-for="(select, index) in Object.keys(zariTypes)"
                    :key="index"
                    :value="select"
                  >{{select}}</option>
                </select>
              </div>
            </div>
            <small
              class="form-text text-muted mb-3"
            >Enter weight between 0Kg and {{zariTypes[newData.zari.type] || 0}}Kg</small>

            <div class="input-group flex-nowrap mb-3">
              <input
                type="number"
                class="form-control"
                placeholder="Enter weight of saree"
                aria-label="Enter weight of saree"
                aria-describedby="addon-wrapping"
                v-model="newData.saree"
              >
              <div class="input-group-append">
                <div class="btn btn-dark">Saree</div>
              </div>
            </div>

            <div class="input-group flex-nowrap mb-3">
              <input
                type="number"
                class="form-control"
                placeholder="Enter Amount"
                aria-label="Enter Amount"
                aria-describedby="addon-wrapping"
                v-model="newData.money"
              >
              <div class="input-group-append">
                <div class="btn btn-dark">Money</div>
              </div>
            </div>

            <input
              class="btn btn-primary"
              type="submit"
              @click="addNewData"
              data-dismiss="modal"
              value="Submit"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";

export default {
  name: "CustomerInfo",
  data() {
    return {
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
        this.newData.date = this.date.today;

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
                this.newData.cone[type] =
                  Math.round(this.newData.cone[type] * 100) / 100;
              }
            }
          }

          if (this.newData.zari) {
            for (let type in this.currentTaniData[this.date.today].zari) {
              if (this.newData.zari[type]) {
                this.newData.zari[type] =
                  parseFloat(this.newData.zari[type]) +
                  parseFloat(this.currentTaniData[this.date.today].zari[type]);
                this.newData.zari[type] =
                  Math.round(this.newData.zari[type] * 100) / 100;
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
button {
  margin-right: 0.2rem;
  font-size: 0.9rem;
}
.card-body,
.card-header {
  padding: 0;
}
.card {
  border-bottom: 1px solid rgba(0, 0, 0, 0.125) !important;
}
.btn-dark {
  border-top-right-radius: 0.25rem !important;
  border-bottom-right-radius: 0.25rem !important;
}
.form-control {
  border-radius: 0.25rem !important;
}
.input-group-append {
  width: 80px !important;
}
.input-group-append > .btn {
  width: 100%;
  text-align: left;
}
.detail {
  font-size: 14px;
}
.detail > i {
  font-size: 12px;
}
</style>
