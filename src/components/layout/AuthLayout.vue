<script setup lang="ts">
import Logo from "../ui/Logo.vue";
</script>

<template>
  <div class="flex min-h-screen">
    <div
      class="hidden lg:flex lg:w-1/2 lg:m-4 lg:rounded-2xl lg:bg-gradient-to-br lg:from-sky-400 lg:to-blue-500"
    >
      <div class="w-full max-w-lg">
        <!-- you can put an image here -->
      </div>
    </div>

    <!-- content -->
    <div
      class="flex relative w-full flex-col justify-center px-8 lg:w-1/2 lg:px-8"
    >
      <Logo class="absolute top-5 right-5"></Logo>
      <div class="mx-auto w-full max-w-md">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
