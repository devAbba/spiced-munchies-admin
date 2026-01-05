import "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    /**
     * Skip the redirect when 401 occurs due to failed authentication (e.g., login)
     */
    skipFailedAuthRedirect?: boolean;
  }
}
