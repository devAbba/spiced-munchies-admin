<script setup lang="ts">
import { ref } from "vue";
import { ArrowLeft, Mail } from "lucide-vue-next";

import AuthLayout from "@/components/layout/AuthLayout.vue";
import Button from "@/components/ui/Button.vue";
import InputField from "@/components/InputField.vue";
import { useAuthStore } from "@/stores/auth.store";
import router from "@/router";

const authStore = useAuthStore();

const email = ref<string>("");
const message = ref<string>("");

const handleNav = (): void => {
  router.push("/login");
};

const handleForgotPassword = async () => {
  message.value = "";

  const result = await authStore.forgotPassword(email.value);
  if (result?.success) {
    message.value = result.message;
  }
};
</script>

<template>
  <AuthLayout>
    <div class="w-full max-w-sm mx-auto bg-white p-6 shadow rounded-md">
      <div class="flex flex-col justify-center items-center mb-8">
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-300/10 mb-4"
        >
          <Mail class="h-8 w-10 text-blue-500" />
        </div>

        <h1 class="text-2xl font-bold mb-2">Forgot Password?</h1>
        <p class="text-center text-gray-500">
          Enter your registered email and we'll send you reset instructions.
        </p>
      </div>

      <div
        v-if="message"
        class="mb-4 px-4 py-3 rounded-md text-sm text-blue-700 bg-blue-50 border border-blue-200"
      >
        {{ message }}
      </div>

      <form @submit.prevent="handleForgotPassword">
        <InputField
          name="email"
          label="Email"
          type="email"
          :modelValue="email"
          @update:modelValue="email = $event"
          autocomplete="email"
          :error="authStore.forgotPassErrors.email"
          class="mb-6"
        ></InputField>

        <Button class="w-full">Reset Password</Button>
      </form>

      <Button
        @click="handleNav"
        variant="ghost"
        class="mx-auto mt-4 hover:text-blue-600"
      >
        <ArrowLeft class="w-4 h-4 mr-2" />
        Back to Login
      </Button>
    </div>
  </AuthLayout>
</template>
