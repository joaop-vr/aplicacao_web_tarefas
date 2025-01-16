import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Kanban from "../views/Kanban.vue";
import Dashboard from "../views/Dashboard.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/kanban",
    name: "Kanban",
    component: Kanban,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
