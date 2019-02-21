import Vue from "vue";
import Router from "vue-router";
import Item from "./views/Item.vue";
import Customer from "./views/Customer.vue";
import Setting from "./views/Setting.vue";
import Dashboard from "./views/Dashboard.vue";
import AddCustomer from "./views/AddCustomer.vue";
import ItemZari from "./views/ItemZari.vue";
import ItemCone from "./views/ItemCone.vue";
import ItemSaree from "./views/ItemSaree.vue";


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "*",
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
      component: Customer
    },
    {
      path: "/setting",
      name: "Setting",
      component: Setting
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard
    },
    {
      path: "/customer/new",
      name: "AddCustomer",
      component: AddCustomer
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
    }
  ]
});
