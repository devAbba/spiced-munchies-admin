<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { useRoute } from "vue-router";
import {
  LayoutDashboard,
  BarChart,
  Users,
  FileText,
  Settings,
} from "lucide-vue-next";

import { useSidebarStore } from "@/stores/sidebar.store";

const sidebarStore = useSidebarStore();

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Analytics", url: "/analytics", icon: BarChart },
  { title: "Users", url: "/users", icon: Users },
  { title: "Reports", url: "/reports", icon: FileText },
  { title: "Settings", url: "/settings", icon: Settings },
];

const isActiveLink = (routePath: string): boolean => {
  const route = useRoute();
  return route.path === routePath;
};

const windowWidth = ref(window.innerWidth);

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

const autoCollapseSidebar = () => {
  if (windowWidth.value < 1024) {
    sidebarStore.setCollapsedState(sidebarStore.isCollapsed);
  } else {
    sidebarStore.setCollapsedState(false);
  }
};

onMounted(() => {
  window.addEventListener("resize", updateWindowWidth);
  autoCollapseSidebar();
});

watch(windowWidth, () => {
  autoCollapseSidebar();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateWindowWidth);
});
</script>

<template>
  <aside
    class="flex flex-col bg-white border-r border-gray-300 transition-all duration-300"
    :class="{
      'w-60': !sidebarStore.isCollapsed,
      'w-16': sidebarStore.isCollapsed,
    }"
  >
    <div class="flex justify-center py-4" v-if="!sidebarStore.isCollapsed">
      <span class="text-xl">Navigation</span>
    </div>

    <nav>
      <ul
        :class="{
          'flex flex-col justify-start': !sidebarStore.isCollapsed,
          'flex flex-col justify-center pt-6': sidebarStore.isCollapsed,
        }"
      >
        <li v-for="item in menuItems" :key="item.title" class="w-full">
          <router-link
            :to="item.url"
            :class="{
              'items-start': !sidebarStore.isCollapsed,
              'justify-center w-full items-center': sidebarStore.isCollapsed,
              'bg-gray-100 border-l-4 border-blue-400': isActiveLink(item.url),
            }"
            class="flex p-3 gap-3 hover:bg-gray-100 hover:border-l-4 hover:border-blue-400 transition-all"
          >
            <component :is="item.icon" class="h-5 w-5 transition-all" />
            <span
              v-if="!sidebarStore.isCollapsed"
              class="transition-opacity duration-300"
              >{{ item.title }}</span
            >
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
aside {
  transition: width 0.3s ease;
}

aside.w-16 nav a .h-5.w-5 {
  transition: transform 0.3s ease;
}

aside.w-16 nav ul {
  height: 100%;
}

aside.w-16 nav ul li {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
