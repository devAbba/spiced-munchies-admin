<script setup lang="ts">
import { ref } from "vue";
import { LogIn } from "lucide-vue-next";

import AuthLayout from "@/components/layout/AuthLayout.vue";
import Button from "@/components/ui/Button.vue";
import InputField from "@/components/InputField.vue";
import { useAuthStore } from "@/stores/auth.store";

const authStore = useAuthStore();

const email = ref<string>("");
const password = ref<string>("");

const handleLogin = async () => {
  await authStore.login(email.value, password.value);
};
</script>

<template>
  <AuthLayout>
    <div class="w-full max-w-sm mx-auto bg-white p-6 shadow rounded-md">
      <div class="flex flex-col justify-center items-center mb-8">
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-300/10 mb-4"
        >
          <LogIn class="w-8 h-8 text-blue-500" />
        </div>
        <h1 class="text-2xl font-bold">Welcome Back</h1>
        <p class="text-center text-gray-500">
          Sign in to your account to continue
        </p>
      </div>

      <form @submit.prevent="handleLogin">
        <InputField
          name="email"
          label="Email"
          type="email"
          :modelValue="email"
          @update:modelValue="email = $event"
          autocomplete="email"
          :error="authStore.authErrors.email"
          class="mb-7"
        />

        <InputField
          name="password"
          label="Password"
          type="password"
          :modelValue="password"
          @update:modelValue="password = $event"
          autocomplete="current-password"
          :error="authStore.authErrors.password"
          class="mb-6"
        />

        <Button :disabled="authStore.loading" class="w-full"> Sign in</Button>

        <div class="mt-2 px-1 text-sm">
          Forgot password? You can reset it using this
          <router-link
            :to="{ name: 'ForgotPassword' }"
            class="font-semibold underline hover:text-blue-500"
            >link</router-link
          >
        </div>
      </form>
    </div>
  </AuthLayout>
</template>
