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
import CustomerData from "./views/Customer.vue";
import Login from "./views/Login.vue";
Vue.use(Router);

export default new Router({
  routes: [{
      path: "/",
      redirect: "/login"
    },
    {
      path: "*",
      redirect: "/login"
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
      children: [{
          path: "/customer/new", // customer child
          name: "AddCustomer",
          component: AddCustomer
        },
        {
          path: "/customer/:name", // customer child
          name: "viewCustName",
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
      name: "ItemZari",
      component: ItemZari
    },
    {
      path: "/item/cone",
      name: "ItemCone",
      component: ItemCone
    },
    {
      path: "/item/saree",
      name: "ItemSaree",
      component: ItemSaree
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/customer/data",
      name: "CustomerData",
      component: CustomerData
    }
  ]
});