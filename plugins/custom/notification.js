import Notification from '@/components/Notification.vue';
import EventBus from '@/util/EventBus';

const NotificationPlugin = {
  install(Vue, globalOptions) {
    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$notification = {
      open(message, options = {}) {
        this.closeAll();

        const propsData = {
          ...globalOptions,
          ...options,
          message,
        };

        const element = document.createElement('div');
        document.querySelector('body').appendChild(element);
        return new (Vue.extend(Notification))({
          propsData,
        }).$mount(element);
      },
      closeAll() {
        EventBus.$emit('clear-notification');
      },
      success(message, options = {}) {
        return this.open(message, {
          ...options,
          type: 'success',
        });
      },
      error(message, options = {}) {
        return this.open(message, {
          ...options,
          type: 'error',
        });
      },
      warning(message, options = {}) {
        return this.open(message, {
          ...options,
          type: 'warning',
        });
      },
      info(message, options = {}) {
        return this.open(message, {
          ...options,
          type: 'info',
        });
      },
    };
  },
};

export default NotificationPlugin;
