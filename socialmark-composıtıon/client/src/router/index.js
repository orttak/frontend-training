import { createRouter, createWebHashHistory } from "vue-router";
import store from "../store";
const routes = [
  {
    name: "HomePage",
    path: "/",
    component: () => import("@/views/Home")
  },
  {
    name: "LoginPage",
    path: "/login",
    component: () => import("@/views/Login")
  },
  {
    name: "RegisterPage",
    path: "/register",
    component: () => import("@/views/Register")
  },
  {
    name: "NewBookmarkPage",
    path: "/new",
    component: () => import("@/views/NewBookmark")
  },
  {
    name: "Favorites",
    path: "/favorites",
    meta: {
      componentName: "appBookmarkList"
    },
    component: () => import("@/views/Account")
  },
  {
    name: "Likes",
    path: "/likes",
    meta: {
      componentName: "appBookmarkList"
    },
    component: () => import("@/views/Account")
  },
  {
    name: "Settings",
    path: "/settings",
    meta: {
      componentName: "userSettings"
    },
    component: () => import("@/views/Account")
  }
];

const router = createRouter({
  routes,
  history: createWebHashHistory()
});

//router.beforeEach((to, from, next) >> default. next bir callback
// next(false) >> router a gitme
router.beforeEach((to, _, next) => {
  // burada login olan kullanicilarin gidebilecegi yerleri tanimliyoruz
  const authRequiredRoutes = ["HomePage"];
  // withput login olan kullanicilarin gidebilecegi yerleri tanimliyoruz
  const authNotRequiredRoutes = ["LoginPage", "RegisterPage"];
  // vuex icindeki degiskenden deger almak icin ve login olduysa home a gonderecegiz
  const _isAuthenticated = store.getters._isAuthenticated;
  // eger bir sonraki sayfa yani "to" nun ismi authRequiredRoutes icinde varsa ve 
  //_isAuthenticated true ise

  // bu sayede ornegin eger kullanici login olduysa tekrar login veye register sayfasina 
  // gidemeyecek
  if (authNotRequiredRoutes.indexOf(to.name) > -1 && _isAuthenticated) next(false);

  if (authRequiredRoutes.indexOf(to.name) > -1) {
    if (_isAuthenticated) next();
    else next({ name: "LoginPage" });
  } else {
    next();
  }
});

export default router;
