<script setup lang="ts">
import { ref } from "vue";
import { Lock } from "lucide-vue-next";

import AuthLayout from "@/components/layout/AuthLayout.vue";
import Button from "@/components/ui/Button.vue";
import InputField from "@/components/InputField.vue";
import { useAuthStore } from "@/stores/auth.store";

const authStore = useAuthStore();

const password = ref<string>("");
const confirmPassword = ref<string>("");

const handleResetPassword = (): void => {};
</script>

<template>
  <AuthLayout>
    <div class="w-full max-w-sm mx-auto bg-white p-6 shadow-md rounded-md">
      <div class="flex flex-col justify-center items-center mb-8">
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-300/10 mb-4"
        >
          <Lock class="w-8 h-8 text-blue-500" />
        </div>
        <h1 class="text-2xl font-bold mb-2">Reset Password</h1>
        <p class="text-center text-gray-500">
          Create a new secure password for your account
        </p>
      </div>

      <form @submit.prevent="handleResetPassword">
        <InputField
          name="password"
          label="New Password"
          type="password"
          :modelValue="password"
          @update:modelValue="password = $event"
          autocomplete="current-password"
          class="mb-7"
        />

        <InputField
          name="confirm-password"
          label="Confirm Password"
          type="password"
          :modelValue="confirmPassword"
          @update:modelValue="confirmPassword = $event"
          autocomplete="off"
          class="mb-6"
        />
        <Button class="w-full">Change Password</Button>
      </form>
    </div>
  </AuthLayout>
</template>
