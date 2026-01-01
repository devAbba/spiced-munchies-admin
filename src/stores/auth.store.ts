import axios, { AxiosError } from "axios";
import { defineStore } from "pinia";

import toast from "../utils/toast";

interface Issue {
  path: string[];
  reason: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    loading: false,
    errors: {
      auth: {} as any,
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
      this.errors.auth = {}; // clear previous errors
      this.loading = true;
      toast.loading("signing in...");
      try {
        await axios.post("/auth/login", {
          email,
          password,
          userType: "Admin",
        });

        this.router.push({ name: "TwoFactorAuth" });
      } catch (error) {
        if (error instanceof AxiosError) {
          switch (error.response?.status) {
            case 422:
              error.response.data.issues.forEach((issue: Issue) => {
                const path = issue.path[0];
                const key = path !== undefined ? path : "unknown";
                this.errors.auth[key] = issue.reason;
              });
              break;
            case 401:
              this.errors.auth["password"] = error.response.data.message;
              break;
            default:
              toast.error(error.response?.data.message);
          }
        } else {
          toast.error("Something went wrong.");
        }
      } finally {
        this.loading = false;
        toast.closeLoadingToast();
      }
    },
    async verify2FA(token: string) {
      this.loading = true;
      try {
        const result = await axios.post("/auth/verify-2fa", { token });
        if (result.data.is2FAuthenticated) {
          this.router.push("/");
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error.response);
          toast.error(error.response?.data.message);
        } else {
          toast.error("Something went wrong.");
        }
      } finally {
        this.loading = false;
      }
    },
    logout() {
      this.user = null;
    },
  },
});
