import axios, { AxiosError } from "axios";
import { defineStore } from "pinia";

import toast from "../utils/toast";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    loading: false,
    errors: {
      auth: [],
    },
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
    authErrors: (state) => state.errors.auth,
  },
  actions: {
    async getUser() {
      try {
        const res = await axios.get("/auth/me");
        this.user = res.data;
      } catch (error) {
        this.user = null;
      }
    },
    async login(email: string, password: string) {
      this.errors.auth = []; // clear previous errors
      this.loading = true;
      toast.loading("signing in...");

      try {
        await axios.post("/auth/login", { email, password });

        await this.getUser();

        toast.success("login successful.");
        this.router.push("/");
      } catch (error) {
        if (error instanceof AxiosError) {
          // handle validation errors
          if (error.response?.status === 422) {
            this.errors.auth = error.response.data.errors;
          } else {
            // handle general server errors
            toast.error(error.response?.data);
          }
        } else {
          toast.error("Something went wrong!");
        }
      } finally {
        this.loading = false;
        toast.closeLoadingToast();
      }
    },
  },
});
