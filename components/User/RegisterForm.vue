<template>
  <div class="bg-gray-50 p-4 rounded-lg">
    <form @submit.prevent="onSubmit">
      <div class="field">
        <BaseInput
          id="username"
          :value="userData.username"
          :error="getError('username')"
          label="Username"
          @input="updateUserData('username', $event)"
        />
      </div>

      <div class="field">
        <BaseInput
          id="email"
          :value="userData.email"
          :error="getError('email')"
          label="Email"
          type="email"
          @input="updateUserData('email', $event)"
        />
      </div>

      <div class="field">
        <BaseInput
          id="first-name"
          :value="userData.firstName"
          label="First Name"
          @input="updateUserData('firstName', $event)"
        />
      </div>

      <div class="field">
        <BaseInput
          id="last-name"
          :value="userData.lastName"
          label="Last Name"
          @input="updateUserData('lastName', $event)"
        />
      </div>

      <div class="field">
        <PasswordInput
          id="password"
          :value="userData.password"
          :error="getError('password')"
          label="Password"
          @input="updateUserData('password', $event)"
        />
      </div>

      <div class="field">
        <PasswordInput
          id="password-confirmation"
          :value="userData.passwordConfirmation"
          :error="getError('passwordConfirmation')"
          label="Password Confirmation"
          @input="updateUserData('passwordConfirmation', $event)"
        />
      </div>

      <div class="actions">
        <button
          :disabled="loading || formInvalid"
          type="submit"
          class="button button-primary w-full inline-flex items-center justify-center mb-2"
        >
          <Spinner v-show="loading" class="-ml-8 mr-3 h-5 w-5" />
          Register
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators';

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
    errors: {
      type: Object,
      default: () => ({}),
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  validations: {
    userData: {
      username: {
        required,
        minLength: minLength(3),
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
      passwordConfirmation: {
        required,
        // eslint-disable-next-line func-names
        sameAsPassword: sameAs(function () {
          return this.userData.password;
        }),
      },
    },
  },
  computed: {
    formInvalid() {
      return (this.$v.userData.$invalid && this.$v.userData.$anyDirty);
    },
  },
  methods: {
    updateUserData(key, value) {
      this.$emit('change', {
        ...this.userData,
        [key]: value,
      });

      if (!this.validated) return;

      this.$nextTick(() => {
        this.$v.userData[key].$touch();
      });
    },

    getError(key) {
      if (key === 'username' && (this.$v.userData.username.$dirty || this.errors.username)) {
        if (this.errors.username) return this.errors.username;
        if (!this.$v.userData.username.required) return 'Username is required';
        if (!this.$v.userData.username.minLength) {
          return `Username must have at least ${this.$v.userData.username.$params.minLength.min} letters`;
        }
        return '';
      }

      if (key === 'email' && (this.$v.userData.email.$dirty || this.errors.email)) {
        if (this.errors.email) return this.errors.email;
        if (!this.$v.userData.email.required) return 'Email is required';
        if (!this.$v.userData.email.email) return 'Email must be a valid email address';
        return '';
      }

      if (key === 'firstName' && this.errors.firstName) {
        return this.errors.firstName;
      }

      if (key === 'lastName' && this.errors.lastName) {
        return this.errors.lastName;
      }

      if (key === 'password' && (this.$v.userData.password.$dirty || this.errors.password)) {
        if (this.errors.password) return this.errors.password;
        if (!this.$v.userData.password.required) return 'Password is required';
        if (!this.$v.userData.password.minLength) {
          return `Password must have at least ${this.$v.userData.password.$params.minLength.min} letters`;
        }
        return '';
      }

      if (key === 'passwordConfirmation' && this.$v.userData.passwordConfirmation.$dirty) {
        if (!this.$v.userData.passwordConfirmation.required) return 'Password confirmation is required';
        if (!this.$v.userData.passwordConfirmation.sameAsPassword) return 'Password do not match';
        return '';
      }

      return '';
    },

    onSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.$notification.error('Oops! There are some errors in your inputs.');
      } else {
        this.$emit('register');
      }
    },
  },
};
</script>
