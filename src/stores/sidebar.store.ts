import { defineStore } from "pinia";

export const useSidebarStore = defineStore("sidebar", {
  state: () => ({
    isCollapsed: false,
  }),

  getters: {
    sidebarState: (state) => state.isCollapsed,
  },

  actions: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
    },
    setCollapsedState(state: boolean) {
      this.isCollapsed = state;
    },
  },
});
