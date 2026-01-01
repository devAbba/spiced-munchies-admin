<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: "primary",
    validator: (value: string) =>
      ["primary", "secondary", "tetiary", "danger", "ghost"].includes(value),
  },
});

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit("click", event);
  }
};

const buttonClass = computed(() => {
  switch (props.variant) {
    case "secondary":
      return "bg-transparent text-orange-600 border-2 border-orange-600 hover:bg-orange-600 hover:text-white focus-visible:outline-orange-600";
    case "tetiary":
      return "bg-transparent text-gray-600 border-2 border-gray-600 hover:bg-gray-600 hover:text-white focus-visible:outline-gray-600";
    case "danger":
      return "bg-transparent text-red-600 border-2 border-red-600 hover:bg-red-600 hover:text-white focus-visible:outline-red-600";
    case "ghost":
      return "bg-transparent border-none !shadow-none outline-none text-gray-600";
    default:
      return "bg-transparent text-blue-600 border-2 border-blue-500 hover:bg-blue-600 hover:text-white focus-visible:outline-blue-500";
  }
});
</script>

<template>
  <button
    :class="[
      'flex justify-center items-center rounded-md px-4 py-1.5 text-sm font-medium leading-6 shadow-sm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2',
      buttonClass,
      { 'cursor-not-allowed opacity-60': disabled },
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>
