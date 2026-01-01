<script setup lang="ts">
import { ref } from "vue";

import Sidebar from "./Sidebar.vue";
import Navbar from "./Navbar.vue";
import Footer from "./Footer.vue";

const screenIsMobile = ref(window.innerWidth <= 1024);

window.addEventListener("resize", () => {
  screenIsMobile.value = window.innerWidth <= 1024;
});
</script>

<template>
  <div class="flex min-h-screen pr-4">
    <Sidebar class="mr-4" />
    <div class="flex-1 flex flex-col">
      <Navbar class="mt-2" />
      <main class="flex-1 p-6 mt-2">
        <slot></slot>
      </main>
      <Footer class="mt-4" />
    </div>
  </div>
</template>
