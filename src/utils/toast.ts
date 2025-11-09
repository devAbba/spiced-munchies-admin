import Message from "vue-m-message";
import type { MessageOptions } from "vue-m-message";

const defaultOptions: MessageOptions = {
  position: "bottom-right",
  duration: 3000,
};

const toast = {
  loadingInstance: null as any,

  success(msg: string, options: MessageOptions = {}) {
    Message.success(msg, { ...defaultOptions, ...options });
  },

  error(msg: string, options: MessageOptions = {}) {
    Message.error(msg, { ...defaultOptions, ...options });
  },

  info(msg: string, options: MessageOptions = {}) {
    Message.info(msg, { ...defaultOptions, ...options });
  },

  warning(msg: string, options: MessageOptions = {}) {
    Message.warning(msg, { ...defaultOptions, ...options });
  },

  loading(msg: string, options: MessageOptions = {}) {
    this.loadingInstance = Message.loading(msg, {
      ...defaultOptions,
      ...options,
    });
  },

  closeLoadingToast() {
    if (this.loadingInstance) {
      this.loadingInstance.close();
      this.loadingInstance = null;
    }
  },
};

export default toast;
