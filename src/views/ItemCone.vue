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
              <input type="text" class="form-control" placeholder="Enter Cone Colour." v-model="newCone.name">
              <input type="text" class="form-control" placeholder="Enter Weight." v-model="newCone.weight">
              <div class="input-group-append">
                <button class="btn btn-dark btn-sm" type="button" @click.prevent="addNewCone" data-dismiss="modal">Add</button>
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
  name: "ItemCone",
  data() {
    return {
      coneList: [{ name: "Mehroon", weight: 26.35 }],
      newCone: { name: '', weight: ''}
    };
  },
  methods: {
    addNewCone() {
      this.coneList.push(this.newCone);
      this.newCone = { name: '', weight: ''}
    }
  }
};

</script>



<style scoped>
/* p{
    margin: 0;
} */
</style>
