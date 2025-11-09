<script setup lang="ts">
const currentYear: number = new Date().getFullYear();
</script>

<template>
  <footer class="border-t bg-background">
    <div class="container mx-auto px-4 py-6">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-sm text-muted-foreground">
          © {{ currentYear }} All rights reserved.
        </p>
        <div class="flex gap-6">
          <a href="#" class="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Privacy Policy
          </a>
          <a href="#" class="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Terms of Service
          </a>
          <a href="#" class="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
