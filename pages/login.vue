<template>
  <div class="max-w-lg mx-auto">
    <h1 class="text-secondary font-bold text-xl mb-4">
      Welcome to drinqs!
    </h1>

    <LoginForm
      v-model="userData"
      :loading="loading"
      @login="onLogin"
    />

    <div class="mt-12 p-4">
      <p class="text-secondary text-base text-center">
        You don't have an account yet?
      </p>

      <NuxtLink
        to="/register"
        class="button button-secondary w-full inline-flex justify-center mt-2"
      >
        Register
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  middleware: 'guest',
  data() {
    return {
      userData: {},
      loading: false,
    };
  },
  methods: {
    ...mapActions('flash', ['setFlashMessage']),

    async onLogin() {
      this.loading = true;

      try {
        await this.$auth.loginWith('local', { data: { ...this.userData } });

        this.setFlashMessage({
          type: 'success',
          message: 'Welcome back!',
        });
      } catch (err) {
        this.$notification.error({
          message: 'Oops! Username or password is invalid',
          shortMessage: 'Invalid username or password',
        });
      }

      this.loading = false;
    },
  },
};
</script>
