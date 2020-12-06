<template>
  <BaseModal :show="show" @close="close">
    <template #modal-headline>
      <strong>Share "{{ cocktail.name }}"!</strong>
    </template>

    <template #modal-content>
      <div class="w-full flex items-center">
        <BaseInput
          id="cocktail-url"
          ref="urlInput"
          type="text"
          :value="cocktailUrl"
          disabled
          class="w-full mr-2"
        />
        <span class="inline-flex items-center cursor-pointer" @click="copyUrl">
          <ClipboardCopy v-show="copyState === 'initial'" :class="iconCssClasses" />
          <Check v-show="copyState === 'success'" :class="iconCssClasses" />
          <X v-show="copyState === 'error'" :class="iconCssClasses" />
        </span>
      </div>
    </template>

    <template #modal-footer>
      <button
        class="button-gray w-full inline-flex justify-center justify-self-center sm:ml-3 sm:w-auto sm:text-sm"
        @click="close"
      >
        Close
      </button>
    </template>
  </BaseModal>
</template>

<script>
export default {
  name: 'ShareModal',
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    cocktail: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      copyState: 'initial',
    };
  },
  computed: {
    cocktailUrl() {
      return `${this.$config.baseURL}/cocktails/${this.cocktail.slug}`;
    },

    iconCssClasses() {
      return [
        'w-6', 'h-6', 'transition-all', 'duration-300', 'ease-in-out',
        {
          'text-secondary': this.copyState === 'initial',
          'hover:text-secondary-dark': this.copyState === 'initial',

          'text-green-500': this.copyState === 'success',
          'hover:text-green-600': this.copyState === 'success',

          'text-red-500': this.copyState === 'error',
        },
      ];
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },

    async copyUrl() {
      const textToCopy = this.$refs.urlInput.value;

      try {
        await this.$copyText(textToCopy);
        this.copyState = 'success';
      } catch {
        this.copyState = 'error';
      }

      setTimeout(() => {
        this.copyState = 'initial';
      }, 1500);
    },
  },
};
</script>
