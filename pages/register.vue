<template>
  <div class="max-w-lg mx-auto">
    <h1 class="text-secondary font-bold text-xl mb-4">
      Welcome to drinqs!
    </h1>

    <RegisterForm
      v-model="userData"
      :loading="loading"
      @register="onRegister"
    />

    <div class="mt-2 p-4">
      <p class="text-secondary text-base text-center">
        Already have an account?
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
import createUserMutation from '@/graphql/mutations/user/createUser.gql';

export default {
  auth: false,
  middleware: 'guest',
  data() {
    return {
      userData: {
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        passwordConfirmation: '',
      },
      loading: false,
    };
  },
  methods: {
    ...mapActions('flash', ['setFlashMessage']),

    async onRegister() {
      this.loading = true;

      try {
        const { username, email, firstName, lastName, password } = this.userData;

        await this.$apolloProvider.defaultClient.mutate({
          mutation: createUserMutation,
          variables: {
            username,
            email,
            firstName,
            lastName,
            password,
          },
        });

        this.setFlashMessage({
          type: 'success',
          message: 'You successfully registered! You can now login.',
          shortMessage: 'Successfully registered!',
        });

        this.$router.push({ path: '/login' });
      } catch (err) {
        this.$notification.error({
          message: 'Oops! Something went wrong. Please try again.',
          shortMessage: 'Oops! Something went wrong.',
        });
      }

      this.loading = false;
    },
  },
};
</script>
