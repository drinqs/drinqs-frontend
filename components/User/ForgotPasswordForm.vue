<template>
  <div class="bg-gray-50 p-4 rounded-lg">
    <form @submit.prevent="onSubmit">
      <div class="field">
        <BaseInput
          id="username-or-email"
          :value="userData.usernameOrEmail"
          label="Username / Email"
          @input="updateUserData('usernameOrEmail', $event)"
        />
      </div>

      <div class="actions">
        <button
          :disabled="loading"
          type="submit"
          class="button button-primary w-full inline-flex items-center justify-center mb-2"
        >
          <Spinner v-show="loading" class="-ml-8 mr-3 h-5 w-5" />
          Reset Password
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ForgotPasswordForm',
  model: {
    prop: 'userData',
    event: 'change',
  },
  props: {
    userData: {
      type: Object,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    this.$emit('change', {
      usernameOrEmail: '',
    });
  },
  methods: {
    updateUserData(key, value) {
      this.$emit('change', {
        ...this.userData,
        [key]: value,
      });
    },
    onSubmit() {
      this.$emit('submit');
    },
  },
};
</script>
