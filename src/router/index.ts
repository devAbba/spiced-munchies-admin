import { createWebHistory, createRouter } from "vue-router";

import Dashboard from "../pages/Dashboard.vue";

const routes = [
  { path: "/", name: "Dashboard", component: Dashboard },
  {
    path: "/users",
    name: "Users",
    component: () => import("../pages/Users.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../pages/auth/Login.vue"),
  },
  {
    path: "/2fa-auth",
    name: "TwoFactorAuth",
    component: () => import("../pages/auth/TwoFactorAuth.vue"),
  },
  {
    path: "/password-reset",
    name: "ForgotPassword",
    component: () => import("../pages/auth/ForgotPassword.vue"),
  },
  {
    path: "/reset-password",
    component: () => import("../pages/auth/ResetPassword.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
