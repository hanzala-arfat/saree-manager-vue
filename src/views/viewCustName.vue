<template>
  <div class="view-customer-page">
    <div class="container">
      <div class="title-bar">
        <h2>{{ $route.params.name }}</h2>
        <p>Customer Details</p>

        <button
          type="button"
          class="btn btn-primary btn-sm"
          data-toggle="modal"
          data-target="#exampleModalCenter"
        >
          <i class="fas fa-scroll"></i> Add Details
        </button>
      </div>
      <div class="accordion" id="accordionExample">
        <div class="card" v-for="(data, index) in custData" :key="index">
          <div class="card-header" :id="index">
            <h2 class="mb-0">
              <button
                class="btn btn-link"
                type="button"
                data-toggle="collapse"
                :data-target="'#no'+ index "
                aria-expanded="true"
                :aria-controls="'no' + index "
              >Date {{data.date}}</button>
            </h2>
          </div>

          <div
            :id="'no'+ index"
            class="collapse"
            :aria-labelledby="index"
            data-parent="#accordionExample"
          >
            <div class="card-body">
              <p v-if="data.tani">Tani {{data.tani}}</p>
              <p v-if="data.cone">Cone Details {{data.cone}}</p>
              <p v-if="data.saree">Saree Details {{data.saree}}</p>
              <p v-if="data.zari">Zari Details{{data.zari}}</p>
              <p v-if="data.Rs">Rs {{data.Rs}}</p>
            </div>
          </div>
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
                <h5 class="modal-title" id="exampleModalLongTitle">Add Details</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div class="modal-body">
                <div class="input-group flex-nowrap">
                  <div class="input-group-prepend">
                    <span class="input-group-text mb-3" id="addon-wrapping">Cone</span>
                  </div>
                  <input
                    type="number"
                    class="form-control"
                    placeholder="Enter weight of cone"
                    aria-label="Enter weight of cone"
                    aria-describedby="addon-wrapping"
                    v-model="newSaree.cone"
                  >
                </div>

                <div class="input-group flex-nowrap">
                  <div class="input-group-prepend">
                    <span class="input-group-text mb-3" id="addon-wrapping">Zari</span>
                  </div>
                  <input
                    type="number"
                    class="form-control"
                    placeholder="Enter weight of zari"
                    aria-label="Enter weight of zari"
                    aria-describedby="addon-wrapping"
                    v-model="newSaree.zari"
                  >
                </div>

                <div class="input-group flex-nowrap">
                  <div class="input-group-prepend">
                    <span class="input-group-text mb-3" id="addon-wrapping">Saree</span>
                  </div>
                  <input
                    type="number"
                    class="form-control"
                    placeholder="Enter weight of saree"
                    aria-label="Enter weight of saree"
                    aria-describedby="addon-wrapping"
                    v-model="newSaree.saree"
                  >
                </div>

                <div class="input-group flex-nowrap">
                  <div class="input-group-prepend">
                    <span class="input-group-text mb-3" id="addon-wrapping">Money</span>
                  </div>
                  <input
                    type="number"
                    class="form-control"
                    placeholder="Enter Amount"
                    aria-label="Enter Amount"
                    aria-describedby="addon-wrapping"
                    v-model="newSaree.Rs"
                  >
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
    </div>
  </div>
</template>

<script>
export default {
  name: "viewCustName",

  data() {
    return {
      custData: [],
      // { date: "18.02.2019", saree: 12 },
      // { date: "18.02.2019", Rs: 2500, cone: 2.64 },
      // { date: "23.02.2019", saree: 8 },
      // { date: "27.02.2019", Rs: 1500, zari: 1.11 }
      newSaree: {
        saree: undefined,
        cone: undefined,
        zari: undefined,
        Rs: undefined,
        date: undefined
      }
    };
  },
  methods: {
    addNewData() {
      if (
        this.newSaree.zari ||
        this.newSaree.cone ||
        this.newSaree.saree ||
        this.newSaree.Rs
      ) {
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

        today = dd + "/" + mm + "/" + yyyy;
        this.newSaree.date = today;
        this.custData.push(this.newSaree);
        this.newSaree = { saree: "", cone: "", zari: "", Rs: "" };
      } else {
        alert("Not submited value");
      }
    }
  }
};
</script>

<style scoped>
button {
  margin-right: 0.2rem;
  font-size: 0.9rem;
}
</style>
