<script setup lang="ts">
import { ref, computed } from "vue";
import { EyeOff, Eye } from "lucide-vue-next";

const props = defineProps<{
  id?: string;
  name: string;
  label: string;
  type: string;
  modelValue: string;
  error?: string;
  autocomplete: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

// const emit = defineEmits(["update:modelValue"]);
const isPasswordVisible = ref(false);

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

const isFocused = ref(false);

const hasText = computed(() => {
  const value = props.modelValue;
  return typeof value === "string" && value.trim().length > 0;
});

const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  emit("update:modelValue", value);
};
</script>

<template>
  <div class="relative">
    <label
      :for="id"
      :class="{
        'scale-90 text-xs font-semibold': isFocused || hasText,
      }"
      class="absolute -top-2.5 left-3 px-1 text-sm text-gray-500 bg-white z-10 transition-all duration-300 ease-in-out"
    >
      <slot name="label">{{ label }}</slot>
    </label>

    <input
      :id="id"
      :name="name"
      :type="isPasswordVisible ? 'text' : type"
      :value="modelValue"
      @focus="isFocused = true"
      @blur="isFocused = false"
      @input="handleInput"
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-200"
      :autocomplete="autocomplete"
    />
    <button
      v-if="type === 'password'"
      @click="togglePasswordVisibility"
      type="button"
      class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
    >
      <Eye v-if="!isPasswordVisible" class="w-4 h-4" />
      <EyeOff v-if="isPasswordVisible" class="w-4 h-4" />
    </button>

    <div v-if="error" class="absolute text-red-500 text-xs m-0.5">
      <span>{{ error }}</span>
    </div>
  </div>
</template>
