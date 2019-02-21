<template>
  <div class="item-page">
    <div class="container">
      <div class="title-bar">
        <h2>Materials</h2>
        <p>Yahan materials k stock ko manage karen.</p>
        <!-- <button type="button" class="btn btn-primary btn-sm">+ New Item</button> -->
      </div>
    </div>
    <div class="container cards">
      <div class="card-deck">
        <div class="card" v-for="(item, index) in itemList" :key="index">
          <div class="card-body">
            <h5 class="card-title">{{item.name}}</h5>
            <p class="card-text">{{item.description}}</p>
          </div>
          <div class="card-footer bg-transparent">

            <router-link :to="'/item/' + item.name.toLowerCase()" class="btn btn-dark btn-sm">Go ></router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
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
.title-bar {
  background: #e9ecef;
  margin: 16px 0px;
  padding: 36px;
  border-radius: 0.25rem;
}
.card {
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
}
.card-footer {
  border: none;
}
</style>

