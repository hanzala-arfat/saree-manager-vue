<template>
  <div class="container">
    <form class="form-signin">
      <h3 class="h3 mb-3 font-weight-normal align-center">Sign In</h3>
      <label for="inputEmail" class="sr-only">Phone Number</label>
      <input
        type="number"
        id="inputEmail"
        class="form-control"
        placeholder="Phone number"
        required
        autofocus
      >
      <button class="btn btn-lg btn-primary btn-block mt-3" type="submit">Proceed</button>
      <p class="mt-5 mb-3 text-muted">&copy; 2018-2019</p>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login"
};
</script>

<style scoped>
.container {
  width: 65%;
}
.h3 {
  margin-top: 25%;
  text-align: center;
}
</style>

