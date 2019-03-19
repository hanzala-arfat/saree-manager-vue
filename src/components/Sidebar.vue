<template>
  <div class="sidebar bg-dark col-md-2">
    <div class="sidebar-element">
      <router-link to="/dashboard">
        <button
          type="button"
          class="btn btn-light"
          :class="{ active: activeRoute === 'Dashboard' }"
        >
          <i class="fas fa-home"></i>
          <p>Dashboard</p>
        </button>
      </router-link>
    </div>
    <div class="sidebar-element">
      <router-link to="/item">
        <button type="button" class="btn btn-light" :class="{ active: activeRoute === 'Item' }">
          <i class="fas fa-dice-d6"></i>
          <p>Materials</p>
        </button>
      </router-link>
    </div>
    <div class="sidebar-element">
      <router-link to="/customer">
        <button type="button" class="btn btn-light" :class="{ active: activeRoute === 'Customer' }">
          <i class="fas fa-users"></i>
          <p>Customer</p>
        </button>
      </router-link>
    </div>
    <div class="sidebar-element">
      <router-link to="/profile">
        <button type="button" class="btn btn-light" :class="{ active: activeRoute === 'Profile' }">
          <i class="fas fa-user"></i>
          <p>Profile</p>
        </button>
      </router-link>
    </div>
  </div>
</template>


<script>
export default {
  name: "Sidebar",
  data() {
    return {};
  },
  methods: {},
  computed: {
    activeRoute() {
      return this.$route.name;
    }
  }
};
</script>


<style scoped>
.sidebar {
  height: 94vh;
  padding: 10px;
}
.btn-light {
  width: 100%;
  margin: 3px;
  background: none;
  color: white;
  border: none;
}
.btn:active:focus {
  outline: none;
}
button > p {
  display: inline;
  margin-left: 0.5rem;
  font-size: 1rem;
}
button > i {
  font-size: 1rem;
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    z-index: 10;
    padding: 0;
  }
  .sidebar-element {
    margin: 0;
    flex-basis: 25%;
  }
  .btn-light {
    margin: 0;
    padding-top: 12px;
    padding-bottom: 8px;
    border-radius: 0;
  }
  button > p {
    display: block;
    font-size: 0.7rem;
    margin: 0;
  }
  button > i {
    font-size: 1.2rem;
  }
}
</style>


