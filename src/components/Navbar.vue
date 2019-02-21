<template>
    <div class="navbar">
    <a class="navbar-brand" href="#">
      <!-- <img src="./static/aperture.svg" width="30" height="30" class="d-inline-block align-top" alt=""> -->
      <span class="brand-name">Saree Manager</span>
    </a>
    <!-- <ul class="navbar-links">
      <li class="navbar-link">
        <img src="./static/home.svg" width="20" height="20" class="d-inline-block align-top" alt="">
        <router-link to="/">Home</router-link>
      </li>
      <li class="navbar-link">
        <img src="./static/info.svg" width="20" height="20" class="d-inline-block align-top" alt="">
        <router-link to="/about">About</router-link>
      </li>
      <li class="navbar-link">
        <img src="./static/user.svg" width="20" height="20" class="d-inline-block align-top" alt="">
        <span class="link-name">Profile</span>
      </li>
      <li class="navbar-link">
        <img src="./static/settings.svg" width="20" height="20" class="d-inline-block align-top" alt="">
        <span class="link-name">Settings</span>
      </li>
    </ul> -->
  </div>
</template>


<script>
export default {
    name: "Navbar"
}
</script>

<style>
.navbar {
  z-index: 10;
  background-color: #343a40!important;
  display: flex;
    align-items: center;
  color: white;
  width: 100%;
}

.navbar a {
  color: white;
  text-decoration: white
}

.navbar-links {
  list-style-type: none;
  margin: 0;
  padding-left: 0;
  display: flex;
  text-align: center
}

.navbar-link {
  display: inline;
  margin: 1px 12px;
}

</style>
