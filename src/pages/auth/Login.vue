<script lang="ts">
import { ref } from 'vue';

import { useAuthStore } from '../../stores/auth.store';

const authStore = useAuthStore();

const email = ref<string>("");
const password = ref<string>("");

</script>

<template>
    
</template>