<script setup lang="ts">
import { ref } from "vue";

import AppLayout from "@/components/layout/AppLayout.vue";
import Button from "@/components/ui/Button.vue";
import toast from "@/utils/toast";

const loading = ref<boolean>(false);

const showToast = (): void => {
  toast.loading("saving...");
};
</script>

<template>
  <AppLayout>
    <h2 class="text-3xl font-bold tracking-tight">Dashboard</h2>

    <div class="flex justify-center">
      <Button variant="tetiary" width="" :disabled="loading" @click="showToast"
        >Show Toast Message</Button
      >
    </div>

    <div class="mt-8">
      <Chart />
    </div>
  </AppLayout>
</template>
