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
// import firebase from "firebase";
Vue.use(Router);

const router = new Router({
  routes: [
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

// let loggedUser = false;

// setTimeout(() => {
//   firebase.auth().onAuthStateChanged(user => {
//     if (user) {
//       // User is signed in.
//       loggedUser = true;
//     } else {
//       // No user is signed in.
//       loggedUser = false;
//     }
//   });
// }, 1000);

// router.beforeEach((to, from, next) => {
//   if (loggedUser && to.path === "/login") {
//     next({
//       path: "/dashboard"
//     });
//   }
//   if (!loggedUser && to.path != "/login") {
//     console.log('2nd')
//     next({
//       redirect: "/login"
//     });
//   }
// });

export default router;
