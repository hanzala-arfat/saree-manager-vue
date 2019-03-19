import Vue from "vue";
import Router from "vue-router";
import Item from "./views/Item.vue";
import Customer from "./views/Customer.vue";
import Profile from "./views/Profile.vue";
import Dashboard from "./views/Dashboard.vue";
import AddCustomer from "./views/AddCustomer.vue";
import viewCustName from "./views/viewCustName.vue";
import ItemZari from "./views/ItemZari.vue";
import ItemCone from "./views/ItemCone.vue";
import ItemSaree from "./views/ItemSaree.vue";
import Login from "./views/Login.vue";
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
          path: "/customer/:name", // customer child
          name: "Customer",
          component: viewCustName
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
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  let loggedUser = window.localStorage.getItem("userID");
  if (!loggedUser && to.name != "Login") {
    return next({
      path: "/login"
    });
  }
  if (loggedUser && to.name === "Login") {
    return next({
      path: "/dashboard"
    });
  }
  next();
});

export default router;
