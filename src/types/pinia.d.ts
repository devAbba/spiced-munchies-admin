// src/types/pinia.d.ts
import { Router } from "vue-router";

declare module "pinia" {
  export interface PiniaCustomProperties {
    router: Router;
  }
}
