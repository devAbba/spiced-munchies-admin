<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    default: "LOGO",
  },
  color: {
    type: String,
    default: "gray",
  },
});
</script>

<template>
  <div class="w-auto max-w-sm mx-auto flex px-6">
    <span :class="`text-${color}-500 font-bold text-xl`">{{ text }}</span>
  </div>
</template>
