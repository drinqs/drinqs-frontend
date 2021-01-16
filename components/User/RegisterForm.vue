<template>
  <div class="bg-gray-50 p-4 rounded-lg">
    <form @submit.prevent="onSubmit">
      <div class="field">
        <BaseInput
          id="username"
          :value="userData.username"
          label="Username"
          @input="updateUserData('username', $event)"
        />
      </div>

      <div class="field">
        <BaseInput
          id="email"
          :value="userData.email"
          label="Email"
          @input="updateUserData('email', $event)"
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

      <div class="field">
        <PasswordInput
          id="password-confirmation"
          :value="userData.passwordConfirmation"
          label="Password Confirmation"
          @input="updateUserData('passwordConfirmation', $event)"
        />
      </div>

      <div class="actions">
        <button
          :disabled="loading"
          type="submit"
          class="button button-primary w-full inline-flex items-center justify-center mb-2"
        >
          <Spinner v-show="loading" class="animate-spin -ml-8 mr-3 h-5 w-5" />
          Register
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'RegisterForm',
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
      email: '',
      birthday: '',
      password: '',
      passwordConfirmation: '',
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
      this.$emit('register');
    },
  },
};
</script>
