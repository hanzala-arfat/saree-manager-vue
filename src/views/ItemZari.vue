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
              <input type="text" class="form-control" placeholder="Enter Zari Colour." v-model="newZari.name">
              <input type="text" class="form-control" placeholder="Enter Weight."  v-model="newZari.weight">
              <div class="input-group-append">
                <button class="btn btn-dark btn-sm" type="button" @click.prevent="addNewZari" data-dismiss="modal">Add</button>
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
  name: "ItemZari",
  data() {
    return {
      zariList: [
        { name: "Pista", weight: 6.75 }
      ],
      newZari: { name: '', weight: ''}
    };
  },
  methods: {
    addNewZari() {
      this.zariList.push(this.newZari);
      this.newZari = { name: '', weight: ''}
    }
  }
};
</script>



<style scoped>
/* p{
    margin: 0;
} */
</style>
