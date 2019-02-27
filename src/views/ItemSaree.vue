<template>
  <div class="item-saree-page">
    <div class="container">
      <div class="title-bar">
        <h2>Saree</h2>
        <p>Kacchi saree ko apne stock me yahan se add karen.</p>
        <button
          type="button"
          class="btn btn-primary btn-sm"
          data-toggle="modal"
          data-target="#exampleModalCenter"
        >+ Add Saree</button>
      </div>
    </div>
    <div class="container">
      <ul class="list-group">
        <li class="list-group-item" v-for="(saree, index) in sareeList" :key="index">
          <p style="font-weight:650">
            {{ saree.name }}
            <span style="float:right; font-weight:350">{{ saree.pcs }} pcs.</span>
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
            <h5 class="modal-title" id="exampleModalLongTitle">Add Saree</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Enter type of Saree." v-model="newSaree.name">
              <input type="text" class="form-control" placeholder="Enter pcs." v-model="newSaree.pcs">
              <div class="input-group-append">
                <button class="btn btn-dark btn-sm" type="button" @click.prevent="addNewSaree" data-dismiss="modal">Add</button>
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
  name: "ItemSaree",
  data() {
    return {
      sareeList: [{ name: "Tanchuiya", pcs: 14 }],
      newSaree: { name: '', pcs: ''}
    };
  },
  methods:{
    addNewSaree(){
      this.sareeList.push(this.newSaree)
      this.newSaree = {name:'',pcs:'' }
    }
  }
};
</script>



<style scoped>
/* p{
    margin: 0;
} */
</style>
