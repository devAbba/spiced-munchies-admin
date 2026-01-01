<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";

import AuthLayout from "@/components/layout/AuthLayout.vue";
import Button from "@/components/ui/Button.vue";
import { useAuthStore } from "@/stores/auth.store";

const authStore = useAuthStore();

const OTP_LENGTH = 6;

const timeLeft = ref<number>(45);
const resendCooldown = ref(false);

const values = ref<string[]>(Array(OTP_LENGTH).fill("")); // OTP input values
const inputRefs = ref<(HTMLInputElement | null)[]>([]); // References to input fields

// Focus the first input field on mount
onMounted(() => {
  nextTick(() => {
    const firstInput = inputRefs.value[0];
    if (firstInput) {
      firstInput.focus();
    }
  });
});

function handleChange(index: number, event: Event) {
  const target = event.target as HTMLInputElement;
  if (!target) return;

  let value = target.value.slice(0, 1).toUpperCase();
  if (!/^[a-zA-Z0-9]$/.test(value)) return;

  values.value[index] = value;

  if (value && index < OTP_LENGTH - 1) {
    const nextInput = inputRefs.value[index + 1];
    if (nextInput) {
      nextInput.focus();
    }
  }
}

function handleKeyDown(index: number, event: KeyboardEvent) {
  const target = event.target as HTMLInputElement;
  if (!target) return;

  if (event.key === "Backspace") {
    // If the current input is empty, focus the previous input
    if (!values.value[index] && index > 0) {
      const prevInput = inputRefs.value[index - 1];
      if (prevInput) {
        prevInput.focus();
      }
    } else if (values.value[index]) {
      values.value[index] = "";
    }
  } else if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
    const nextInput = inputRefs.value[index + 1];
    if (nextInput) {
      nextInput.focus();
    }
  } else if (event.key === "ArrowLeft" && index > 0) {
    const prevInput = inputRefs.value[index - 1];
    if (prevInput) {
      prevInput.focus();
    }
  }
}

function handlePaste(event: ClipboardEvent) {
  event.preventDefault();

  const clipboardData = event.clipboardData?.getData("text") ?? "";
  const pastedData = clipboardData.trim().toUpperCase();

  if (!/^[A-Z0-9]+$/i.test(pastedData)) {
    console.error("Please paste only letters and numbers");
    return;
  }

  const characters = pastedData.slice(0, OTP_LENGTH).split("");
  const newCode = [...values.value];

  characters.forEach((char, i) => {
    if (i < OTP_LENGTH) {
      newCode[i] = char;
    }
  });

  values.value = newCode;

  // Focus the last filled input
  const lastIndex = Math.min(characters.length - 1, OTP_LENGTH - 1);
  const lastInput = inputRefs.value[lastIndex];
  if (lastInput) {
    lastInput.focus();
  }
}

const verifyCode = async () => {
  const fullCode = values.value.join("");
  await authStore.verify2FA(fullCode);
};

const resendCode = () => {
  resendCooldown.value = true;
  timeLeft.value = 45; // Reset the timer to 45 seconds

  const timer = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      clearInterval(timer);
      resendCooldown.value = false; // Reset the cooldown
    }
  }, 1000);
};
</script>

<template>
  <AuthLayout>
    <div class="flex flex-col justify-center gap-6 p-2 md:p-8">
      <div class="mb-2 text-center">
        <div class="mb-4 flex justify-center">
          <div
            class="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 animate-pulse"
          >
            <svg
              class="h-8 w-8 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
        </div>
        <h1 class="text-2xl font-bold text-card-foreground mb-2">
          Two-Factor Authentication
        </h1>
        <p class="text-gray-500">
          Enter the 6-character code sent to your registered email
        </p>
      </div>

      <div class="flex justify-center gap-2 mb-2">
        <input
          v-for="(_, index) in Array(OTP_LENGTH)"
          :key="index"
          ref="inputRefs"
          type="text"
          maxlength="1"
          inputmode="text"
          v-model="values[index]"
          class="w-12 h-14 text-center text-xl font-medium border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-400 focus:border-blue-400 transition"
          @input="handleChange(index, $event)"
          @keydown="handleKeyDown(index, $event)"
          @paste="handlePaste"
          :aria-label="`Character ${index + 1}`"
          autocomplete="off"
        />
      </div>

      <Button
        @click="verifyCode"
        class="w-full"
        :disabled="values.includes('')"
      >
        Verify Code
      </Button>

      <div class="text-center">
        <p class="text-sm text-gray-500 mb-1">Didn't receive a code?</p>
        <button
          @click="resendCode"
          :class="{ 'text-blue-700 hover:underline': resendCooldown === false }"
          class="text-sm font-medium transition-colors"
          :disabled="resendCooldown"
        >
          {{ resendCooldown ? `Resend in ${timeLeft}s` : "Resend Code" }}
        </button>
      </div>
    </div>
  </AuthLayout>
</template>
