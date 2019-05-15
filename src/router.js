import Vue from "vue";
import Router from "vue-router";
import Item from "./views/Item.vue";
import Customer from "./views/Customer.vue";
import Profile from "./views/Profile.vue";
import Dashboard from "./views/Dashboard.vue";
import AddCustomer from "./views/AddCustomer.vue";
import CustomerInfo from "./views/CustomerInfo.vue";
import ItemZari from "./views/ItemZari.vue";
import ItemCone from "./views/ItemCone.vue";
import ItemSaree from "./views/ItemSaree.vue";
import Login from "./views/Login.vue";
import WorkerDashboard from "./views/WorkerDashboard.vue";
import store from "./store/store";
Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/dashboard"
    },
    {
      path: "/item",
      name: "Item",
      component: Item
    },
    {
      path: "/customer",
      name: "Customer",
      component: Customer,
      children: [
        {
          path: "/customer/new", // customer child
          name: "Customer",
          component: AddCustomer
        },
        {
          path: "/customer/:id", // customer child
          name: "Customer",
          component: CustomerInfo
        }
      ]
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard
    },
    {
      path: "/item/zari",
      name: "Item",
      component: ItemZari
    },
    {
      path: "/item/cone",
      name: "Item",
      component: ItemCone
    },
    {
      path: "/item/saree",
      name: "Item",
      component: ItemSaree
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/worker",
      name: "WorkerDashboard",
      component: WorkerDashboard
    }
  ]
});

router.beforeEach((to, from, next) => {
  store.watch((_, getters) => {
    if (
      getters.isAuthenticated &&
      getters.isWorker &&
      (to.name != "WorkerDashboard" && to.name != "Profile")
    ) {
      console.log("Redirecting to worker page.");
      return next({
        path: "/worker"
      });
    }
    if (!getters.isAuthenticated && to.name != "Login") {
      return next({
        path: "/login"
      });
    }
    if (getters.isAuthenticated && to.name === "Login") {
      return next({
        path: "/dashboard"
      });
    }
    next();
  });
});

export default router;
