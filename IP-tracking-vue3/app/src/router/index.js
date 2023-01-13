import { createRouter, createWebHistory } from "vue-router";
import HomeViev from "../views/HomeView.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeViev,
    meta: {
      title: "IP Address Tracker",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  next();
});

export default router;
