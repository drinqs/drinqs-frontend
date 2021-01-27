<template>
  <div class="max-w-lg mx-auto">
    <h1 class="text-secondary font-bold text-xl mb-4">
      Your Profile
    </h1>

    <UpdateProfileForm
      v-model="userData"
      :loading="loading"
      :errors="errors"
      @update="onUpdateProfile"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import UpdateProfileMutation from '@/graphql/mutations/User/UpdateProfile.gql';

function convertErrors(errors) {
  return errors.reduce((errorsCollection, errorAtom) => {
    // eslint-disable-next-line no-param-reassign
    errorsCollection[errorAtom.key] = errorAtom.message;

    return errorsCollection;
  }, {});
}

function compactObject(object) {
  const newObject = {};
  Object.keys(object).forEach((prop) => {
    if (object[prop]) newObject[prop] = object[prop];
  });
  return newObject;
}

export default {
  data() {
    return {
      userData: {
        username: this.$auth.user.username,
        email: this.$auth.user.email,
        firstName: this.$auth.user.firstName,
        lastName: this.$auth.user.lastName,
        password: '',
        passwordConfirmation: '',
      },
      errors: {},
      loading: false,
    };
  },
  computed: {
    user() {
      return this.$auth.user;
    },
  },
  watch: {
    user() {
      this.$set(this.userData, 'username', this.$auth.user.username);
      this.$set(this.userData, 'email', this.$auth.user.email);
      this.$set(this.userData, 'firstName', this.$auth.user.firstName);
      this.$set(this.userData, 'lastName', this.$auth.user.lastName);
    },
  },
  methods: {
    ...mapActions('flash', ['setFlashMessage']),

    async onUpdateProfile() {
      this.loading = true;

      try {
        const { username, email, firstName, lastName, password } = this.userData;

        const { data } = await this.$apolloProvider.defaultClient.mutate({
          mutation: UpdateProfileMutation,
          variables: compactObject({
            username,
            email,
            firstName,
            lastName,
            password,
          }),
        });

        if ((data.updateProfile?.errors || []).length === 0) {
          this.$notification.success({
            message: 'You successfully updated your Profile!',
          });
          this.$auth.refreshTokens();
        } else {
          this.errors = convertErrors(data.updateProfile.errors);
          this.$notification.error('Oops! There are some errors in your inputs.');
        }
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
