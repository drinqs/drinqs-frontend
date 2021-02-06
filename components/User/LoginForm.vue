<template>
  <div class="bg-gray-50 p-4 rounded-lg">
    <form @submit.prevent="onSubmit">
      <div class="field">
        <BaseInput
          id="username"
          :value="userData.username"
          label="Username"
          placeholder="username"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          @input="updateUserData('username', $event)"
        />
      </div>

      <div class="field">
        <PasswordInput
          id="password"
          :value="userData.password"
          label="Password"
          @input="updateUserData('password', $event)"
        />
      </div>

      <div class="actions">
        <button
          :disabled="loading"
          type="submit"
          class="button button-primary w-full inline-flex items-center justify-center"
        >
          <Spinner v-show="loading" class="-ml-8 mr-3 h-5 w-5" />
          Login
        </button>

        <!-- <button
          :disabled="loading"
          type="submit"
          class="button button-primary w-full inline-flex items-center justify-center mb-2"
        >
          <Spinner v-show="loading" class="-ml-8 mr-3 h-5 w-5" />
          Login
        </button>

        <NuxtLink
          to="/forgot-password"
          class="button button-secondary-outlined w-full inline-flex justify-center"
        >
          Forgot Password?
        </NuxtLink> -->
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
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
      username: '',
      password: '',
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
      this.$emit('login');
    },
  },
};
</script>
