import { createRouter, createWebHistory } from "vue-router";
import { getSession } from "../utils/auth";
import LandingView from "../views/HomeView.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import DashboardView from "../views/DashboardView.vue";
import Tickets from "../views/Tickets.vue";

const routes = [
  {
    path: "/",
    name: "LandingView",
    component: LandingView,
  },
  {
    path: "/auth/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/auth/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/dashboard",
    name: "DashboardView",
    component: DashboardView,
    meta: { requiresAuth: true },
  },
  {
    path: "/tickets",
    name: "Tickets",
    component: Tickets,
    meta: { requiresAuth: true },
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const session = getSession();

  // Check if route requires authentication
  if (to.meta.requiresAuth && !session) {
    next("/login");
  } else {
    next();
  }
});

export default router;
