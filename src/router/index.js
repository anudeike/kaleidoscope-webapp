import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import createPalettePage from "../views/createPalettePage";
import auth from "../views/authPage";
import searchResultsPage from "../views/searchResultsPage";
import chooseCreateMethod from "../views/chooseCreateMethod";
import createPalettePageImage from "../views/createPalettePageImage";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: "/"
  },
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About
  },
  {
    path: '/create',
    name: "createPalettePage",
    component: createPalettePage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/auth",
    name: "auth",
    component: auth
  },
  {
    path: "/search/:query",
    name: "search",
    component: searchResultsPage
  },
  {
    path: "/chooseMethod",
    name: "chooseMethod",
    component: chooseCreateMethod
  },
  {
    path: '/createFromImage',
    name: "createFromImage",
    component: createPalettePageImage, // may want to add meta route?
  }



];

const router = new VueRouter({
  routes
});

export default router;
