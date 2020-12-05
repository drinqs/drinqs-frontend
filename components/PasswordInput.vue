<template>
  <BaseInput
    :id="id"
    :value="value"
    :label="label"
    :error="error"
    :type="type"
    :icon="icon"
    :clickable-icon="true"
    placeholder="********"
    @input="onInput"
    @icon-click="onIconClick"
  />
</template>

<script>
export default {
  name: 'PasswordInput',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    value: {
      type: [Number, String, Boolean, Array, Object],
      default: '',
    },

    id: {
      type: String,
      required: true,
    },

    label: {
      type: String,
      default: 'Password',
    },
    error: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      type: 'password',
      icon: 'eye-off',
    };
  },
  methods: {
    onInput(newValue) {
      this.$emit('input', newValue);
    },
    onIconClick() {
      this.type = this.type === 'password' ? 'text' : 'password';
      this.icon = this.icon === 'eye-off' ? 'eye-on' : 'eye-off';
    },
  },
};
</script>
