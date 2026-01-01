<script setup lang="ts">
import { ref } from "vue";
import { Menu as MenuIcon, User, Settings, LogOut } from "lucide-vue-next";
import { useSidebarStore } from "@/stores/sidebar.store";

// User mock data for now
const user = ref({
  name: "Admin User",
  email: "admin@example.com",
  initials: "AU",
});

const sidebarStore = useSidebarStore();

const isDropdownOpen = ref(false);

const toggleSidebar = () => {
  sidebarStore.toggleSidebar();
};

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};
</script>

<template>
  <header class="sticky top-0 z-50 w-full bg-white shadow-md rounded-md">
    <div class="flex items-center justify-between p-4">
      <button @click="toggleSidebar" class="lg:hidden text-gray-700">
        <MenuIcon class="h-6 w-6" />
      </button>

      <h1 class="text-xl font-semibold">Admin Dashboard</h1>

      <div class="relative">
        <button
          @click="toggleDropdown"
          :class="{ 'ring ring-blue-300': isDropdownOpen }"
          class="relative w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-medium"
        >
          <span>{{ user.initials }}</span>
        </button>

        <div
          v-show="isDropdownOpen"
          class="absolute right-0 mt-2 w-56 bg-white shadow-md rounded-md"
        >
          <div class="p-3">
            <p class="text-sm font-medium">{{ user.name }}</p>
            <p class="text-xs text-gray-500">{{ user.email }}</p>
          </div>
          <div class="border-t">
            <a
              href="#"
              class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <User class="h-4 w-4 text-gray-500" />
              <span>Profile</span>
            </a>

            <a
              href="#"
              class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Settings class="h-4 w-4 text-gray-500" />
              <span>Settings</span>
            </a>

            <a
              @click=""
              class="flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
            >
              <LogOut class="h-4 w-4 text-red-500" />
              <span>Log out</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
