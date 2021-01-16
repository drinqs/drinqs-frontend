<template>
  <div class="max-w-lg mx-auto">
    <h1 class="text-secondary font-bold text-xl mb-4">
      Forgot Your Password?
    </h1>

    <ForgotPasswordForm
      v-model="userData"
      :loading="loading"
      @submit="onForgotPassword"
    />

    <div class="mt-2 p-4">
      <p class="text-secondary text-base text-center">
        Remembered Your Password?
      </p>

      <NuxtLink
        to="/login"
        class="button button-secondary w-full inline-flex justify-center mt-2"
      >
        Login
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  auth: false,
  middleware: 'guest',
  data() {
    return {
      userData: {},
      loading: false,
    };
  },
  methods: {
    ...mapActions('flash', ['setFlashMessage']),
    async forgotPassword() {
      // TODO
    },

    async onForgotPassword() {
      this.loading = true;

      try {
        await this.forgotPassword(this.userData);

        this.setFlashMessage({
          type: 'success',
          message: 'You will receive instructions to reset your password. Check your mails!',
          shortMessage: 'You will receive reset instructions.',
        });

        this.$router.push({ path: '/login' });
      } catch (err) {
        this.$notification.error({
          message: 'Oops! Something went wrong.',
          shortMessage: 'Something went wrong.',
        });
      }

      this.loading = false;
    },
  },
};
</script>
