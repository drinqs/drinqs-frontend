<template>
  <div>
    <label v-if="label" :for="id" class="block text-sm font-medium text-secondary">{{ label }}</label>
    <div class="mt-1 relative rounded-md shadow-sm">
      <input
        :id="id"
        :value="value"
        :disabled="disabled"
        v-bind="$attrs"
        :type="type"
        :class="inputCssClasses"
        @input="$emit('input', $event.target.value)"
      >

      <div
        v-if="icon"
        :class="iconHolderCssClasses"
        @click="onIconClick"
      >
        <component
          :is="iconName"
          :class="['h-6', 'w-6', { 'text-red-500': error, 'text-secondary': !error }]"
        />
      </div>
    </div>
    <p v-if="error" class="text-red-500 text-sm">
      {{ error }}
    </p>
  </div>
</template>

<script>
import { camelCase, upperFirst } from 'lodash';

export default {
  name: 'BaseInput',
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
    type: {
      type: String,
      default: 'text',
    },
    disabled: {
      type: Boolean,
      default: false,
    },

    label: {
      type: String,
      default: '',
    },
    error: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    clickableIcon: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    inputCssClasses() {
      return [
        'block', 'w-full', 'px-3', 'sm:text-sm', 'rounded-md',
        {
          'border-red-500': this.error,
          'focus:border-red-700': this.error,
          'focus:ring-red-700': this.error,

          'text-secondary': !this.disabled,
          'border-secondary-lighter': !this.error && !this.disabled,
          'focus:border-secondary': !this.error && !this.disabled,
          'focus:ring-secondary': !this.error && !this.disabled,

          'bg-gray-200': this.disabled,
          'border-gray-400': this.disabled,
          'text-gray-500': this.disabled,

          'pr-9': this.icon,
        },
      ];
    },
    iconHolderCssClasses() {
      return [
        'absolute', 'inset-y-0', 'right-0', 'pr-3', 'flex', 'items-center',
        {
          'pointer-events-none': !this.clickableIcon,
          'cursor-pointer': this.clickableIcon,
        },
      ];
    },

    iconName() {
      return this.icon ? upperFirst(camelCase(this.icon)) : '';
    },
  },
  methods: {
    onIconClick() {
      if (this.clickableIcon) {
        this.$emit('icon-click');
      }
    },
  },
};
</script>
