<template>
  <div>
    <TheHeader />
    <div class="mx-auto p-4">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import { get } from 'vuex-pathify';
import { mapActions } from 'vuex';

export default {
  computed: {
    flashMessage: get('flash/flashMessage'),
  },
  watch: {
    $route() {
      this.showFlashMessage();
    },
  },
  mounted() {
    this.showFlashMessage();
    window.addEventListener('popstate', this.onBackNavigation);
  },
  beforeDestroy() {
    window.removeEventListener('popstate', this.onBackNavigation);
  },
  methods: {
    ...mapActions('flash', ['consumeFlashMessage']),
    ...mapActions('navigation', ['onBackNavigation']),

    showFlashMessage() {
      if (this.flashMessage) {
        this.$notification.open(this.flashMessage);
        this.consumeFlashMessage();
      }
    },
  },
};
</script>

<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
</style>
