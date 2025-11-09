// stores/sidebarStore.ts
import { defineStore } from "pinia";

export const useSidebarStore = defineStore("sidebar", {
  state: () => ({
    isCollapsed: false, // Sidebar initially not collapsed
  }),

  getters: {
    sidebarState: (state) => state.isCollapsed,
  },

  actions: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed; // Toggles the collapse state
    },
    setCollapsedState(state: boolean) {
      this.isCollapsed = state; // Explicitly set the collapsed state
    },
  },
});
