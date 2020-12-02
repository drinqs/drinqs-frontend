<template>
  <transition name="bounce-bottom">
    <div v-show="isActive" :class="containerCssClasses">
      <div class="mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between flex-wrap">
          <div class="w-0 flex-1 flex items-center">
            <span :class="iconHolderCssClasses">
              <component :is="icon" class="h-8 w-8" />
            </span>

            <p class="ml-3 text-white md:text-lg text-center w-full">
              <span v-if="shortMessage" :class="{ 'md:hidden': shortMessage }">
                {{ shortMessage }}
              </span>
              <span :class="{ 'hidden': shortMessage, 'md:inline': shortMessage, 'inline': !shortMessage }">
                {{ message }}
              </span>
            </p>
          </div>

          <div class="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
            <button
              type="button"
              :class="closeButtonCssClasses"
              aria-label="Dismiss"
              @click="close"
            >
              <X class="h-6 w-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import EventBus from '@/util/EventBus';

const DEFAULT_TIMEOUT = 5000;
const NOTIFICATION_TYPES = ['success', 'error', 'warning', 'info'];

export default {
  name: 'Notification',
  props: {
    // around ~60-100 chars
    message: {
      type: String,
      required: true,
    },
    // max ~30 chars
    shortMessage: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'success',
      validator(value) {
        return NOTIFICATION_TYPES.includes(value);
      },
    },
    delay: {
      type: Number,
      required: false,
      default: DEFAULT_TIMEOUT,
    },
  },
  data() {
    return {
      isActive: false,
    };
  },
  computed: {
    icon() {
      switch (this.type) {
        case 'success':
          return 'CheckCircle';
        case 'error':
          return 'XCircle';
        case 'warning':
          return 'Exclamation';
        case 'info':
          return 'InformationCircle';
        default:
          return 'CheckCircle';
      }
    },

    containerCssClasses() {
      return [
        'fixed',
        'bottom-0',
        'left-0',
        'right-0',
        'mb-2',
        'w-11/12',
        'mx-auto',
        'z-50',
        'rounded-lg',
        'shadow-lg',
        {
          'bg-green-600': this.type === 'success',
          'bg-red-600': this.type === 'error',
          'bg-yellow-600': this.type === 'warning',
          'bg-blue-600': this.type === 'info',
        },
      ];
    },
    iconHolderCssClasses() {
      return [
        'flex',
        'text-white',
        'p-2',
        'rounded-lg',
        {
          'bg-green-700': this.type === 'success',
          'bg-red-700': this.type === 'error',
          'bg-yellow-700': this.type === 'warning',
          'bg-blue-700': this.type === 'info',
        },
      ];
    },
    closeButtonCssClasses() {
      return [
        '-mr-1',
        'flex',
        'p-2',
        'rounded-md',
        'focus:outline-none',
        'sm:-mr-2',
        'transition',
        'ease-in-out',
        'duration-150',
        {
          'focus:bg-green-500': this.type === 'success',
          'hover:bg-green-500': this.type === 'success',
          'focus:bg-red-500': this.type === 'error',
          'hover:bg-red-500': this.type === 'error',
          'focus:bg-yellow-500': this.type === 'warning',
          'hover:bg-yellow-500': this.type === 'warning',
          'focus:bg-blue-500': this.type === 'info',
          'hover:bg-blue-500': this.type === 'info',
        },
      ];
    },
  },
  mounted() {
    EventBus.$on('clear-notification', this.close);
    this.isActive = true;
    setTimeout(this.close, this.delay);
  },
  beforeDestroy() {
    EventBus.$off('clear-notification', this.close);
  },
  methods: {
    close() {
      this.isActive = false;

      setTimeout(() => {
        this.$destroy();
        if (typeof this.$el.remove === 'undefined') {
          this.$el.parentNode.removeChild(this.$el);
        } else {
          this.$el.remove();
        }
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
.bounce-bottom-enter-active {
  animation: 400ms ease-in-out bounce-bottom;
}

.bounce-bottom-leave-active {
  animation: 300ms ease-in-out bounce-bottom reverse;
}

@keyframes bounce-bottom {
  0%  { transform: translate3d(0, 250px, 0) }
  28% { transform: translate3d(0,  80px, 0) }
  58% { transform: translate3d(0, -27px, 0) }
  88% { transform: translate3d(0,  -8px, 0) }
}
</style>
