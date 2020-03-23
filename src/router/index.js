import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const ROUTES = [
  {
    path: "/magic",
    component: () => import("@/views/magic")
  },
  {
    path: "/drag",
    component: () => import("@/views/drag")
  }
];

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: ROUTES
});
