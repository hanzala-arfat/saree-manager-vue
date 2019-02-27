<template>
  <div class="view-customer-page">
    <div class="container">
      <div class="title-bar">
        <h2>{{ $route.params.name }}</h2>
        <p>Customer Details</p>
        <button type="button" class="btn btn-primary btn-sm"><i class="fas fa-prescription-bottle"></i> Cone</button>
        <button type="button" class="btn btn-primary btn-sm"><i class="fas fa-database"></i> Zari</button>
        <button type="button" class="btn btn-primary btn-sm"><i class="fas fa-scroll"></i> Saree</button>
        <button type="button" class="btn btn-primary btn-sm"><i class="fas fa-rupee-sign"></i> Money</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "viewCustName"
};
</script>

<style scoped>
button {
  margin-right: 0.2rem;
  font-size: 0.9rem;
}
</style>
