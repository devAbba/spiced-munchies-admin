<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebar.store';
import { LayoutDashboard, BarChart, Users, FileText, Settings } from 'lucide-vue-next';
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';

const sidebarStore = useSidebarStore();

const menuItems = [
  { title: 'Dashboard', url: '/', icon: LayoutDashboard },
  { title: 'Analytics', url: '/analytics', icon: BarChart },
  { title: 'Users', url: '/users', icon: Users },
  { title: 'Reports', url: '/reports', icon: FileText },
  { title: 'Settings', url: '/settings', icon: Settings },
];

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
  window.addEventListener('resize', updateWindowWidth);
  autoCollapseSidebar();
});

watch(windowWidth, () => {
  autoCollapseSidebar();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWindowWidth);
});
</script>

<template>
  <aside
    class="flex flex-col bg-white border-r transition-all duration-300"
    :class="{
      'w-60': !sidebarStore.isCollapsed,
      'w-16': sidebarStore.isCollapsed
    }"
  >
    <div
      class="flex justify-center py-4"
      v-if="!sidebarStore.isCollapsed"
    >
      <span class="text-xl">Navigation</span>
    </div>

    <nav>
      <ul
        :class="{
          'flex flex-col justify-start': !sidebarStore.isCollapsed,
          'flex flex-col justify-center pt-6': sidebarStore.isCollapsed
        }"
      >
        <li
          v-for="item in menuItems"
          :key="item.title"
          class="w-full"
        >
          <router-link
            :to="item.url"
            :class="{
              'flex items-start gap-3 p-3 w-full hover:bg-gray-700 transition-all': !sidebarStore.isCollapsed,
              'flex justify-center items-center gap-3 p-3 w-full hover:bg-gray-700 transition-all': sidebarStore.isCollapsed
            }"
          >
            <component :is="item.icon" class="h-5 w-5 transition-all" />
            <span v-if="!sidebarStore.isCollapsed" class="transition-opacity duration-300">{{ item.title }}</span>
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

