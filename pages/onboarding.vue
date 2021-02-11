<template>
  <div class="max-w-lg mx-auto w-full">
    <h1 class="text-secondary font-bold text-xl mb-2 xs:mb-4">
      Welcome to drinqs!
    </h1>

    <OnboardingForm @complete="onComplete" />
  </div>
</template>

<script>
import { get, call } from 'vuex-pathify';
import CompleteOnboardingMutation from '@/graphql/mutations/User/CompleteOnboarding.gql';

export default {
  middleware({ $auth, redirect, store }) {
    if ($auth.user?.isOnboarded) {
      const path = store.getters['navigation/redirectPath'] || '/start';
      store.dispatch('navigation/consumeRedirectPath');
      redirect(path);
    }
  },
  computed: {
    redirectPath: get('navigation/redirectPath'),
  },
  methods: {
    setFlashMessage: call('flash/setFlashMessage'),

    redirect() {
      const path = this.redirectPath || '/start';
      this.$store.dispatch('navigation/consumeRedirectPath');
      this.$router.replace({ path });
    },

    async onComplete() {
      await this.$apolloProvider.defaultClient.mutate({ mutation: CompleteOnboardingMutation });
      await this.$auth.fetchUser();
      this.setFlashMessage({
        type: 'info',
        message: 'You are good to go!',
      });
      this.redirect();
    },
  },
};
</script>
