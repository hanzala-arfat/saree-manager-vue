<template>
  <div class="item-page">
    <div class="container">
        <div class="title-bar">
            <h2>Customers</h2>
            <p>Yahan new customer add karen.</p>
            <router-link to="/customer/new"> 
               <button type="button" class="btn btn-primary btn-sm">+ Add Customer</button>
            </router-link>
        </div>
    </div>
     <div class="container">
         <ul class="list-group">
            <li class="list-group-item" v-for="(user, index) in userList" :key="index">
                <p style="font-weight:650">
                    {{ user.name }}
                    <span style="float:right; font-weight:350">{{ user.tani }}</span>
                </p>
            </li>
        </ul>
     </div>
  </div>

</template>



<script>
export default {
  name: "Customer",
  data() {
      return {
        userList: [
            { name: 'Sultan', tani: 10 },
            { name: 'Furqan', tani: 14 },
            { name: 'Shamshad', tani: 17 },
            { name: 'Amir', tani: 18 },
            { name: 'Hashim', tani: 20 },
        ]
      }
  }
};
</script>



<style scoped>
/* p{
    margin: 0;
} */
</style>
