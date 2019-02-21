<template>
    <div class="sidebar bg-dark col-md-2">
        <div class="sidebar-element"> 
            <router-link to="/dashboard" >
              <button type="button" class="btn btn-light" @click="toggleActiveCss(0)" :class="{ active: activeBtn === 0 }">Dashboard</button>
            </router-link>
        </div>
        <div class="sidebar-element"> 
            <router-link to="/item" >
              <button type="button" class="btn btn-light" @click="toggleActiveCss(1)" :class="{ active: activeBtn === 1 }">Item</button>
            </router-link>
        </div>
        <div class="sidebar-element">
            <router-link to="/customer"> 
              <button type="button" class="btn btn-light"  @click="toggleActiveCss(2)" :class="{ active: activeBtn === 2 }">Customer</button>
            </router-link>
        </div>
        <div class="sidebar-element">
            <router-link to="/setting">
                 <button type="button" class="btn btn-light"   @click="toggleActiveCss(3)" :class="{ active: activeBtn === 3 }"> Settings</button>
            </router-link>
        </div>
        
    </div>
</template>


<script>
export default {
    name: "Sidebar",
    data() {
        return {
            activeBtn: 0
        }
    },
    methods: {
        toggleActiveCss(clickedBtn) {
           this.activeBtn = clickedBtn
        }
    }
}
</script>


<style>
.sidebar{
    height: 94vh;
    padding: 10px;
}
.btn-light{
    width: 100%;
    margin: 3px;
    background: none;
    color: white;
    border: none
}
.btn:active:focus {
    outline: none;
}


@media(max-width: 768px) {
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
  .sidebar-element{
      margin: 0;
      flex-basis: 25%;
  }
  .btn-light{
      margin: 0;
      padding: 14px;
  }
}

</style>


