<template>
  <div class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <transition
        enter-active-class="transition-opacity ease-out duration-300"
        enter-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity ease-in duration-200"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div class="fixed inset-0">
          <div
            v-if="show"
            class="absolute inset-0 bg-black opacity-75"
            @click="$emit('close')"
          />
        </div>
      </transition>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" />&#8203;

      <transition
        enter-active-class="transition-all ease-out duration-300"
        enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enter-to-class="opacity-100 translate-y-0 sm:scale-100"
        leave-active-class="transition-all ease-in duration-200"
        leave-class="opacity-100 translate-y-0 sm:scale-100"
        leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <div
          v-if="show"
          ref="dialog"
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform
            sm:my-8 sm:align-middle sm:max-w-lg sm:w-full focus:outline-none"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
          tabindex="-1"
          @keyup.esc="$emit('close')"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                v-if="$slots.icon"
                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 sm:mx-0 sm:h-10 sm:w-10"
              >
                <slot name="icon" />
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <slot name="modal-headline" />

                <div class="mt-2">
                  <slot name="modal-content" />
                </div>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <slot name="modal-footer" />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseModal',
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    show(value) {
      if (value) {
        document.body.style.overflow = 'hidden';

        this.$nextTick(() => {
          this.$refs.dialog.focus();
        });
      } else {
        document.body.style.overflow = 'auto';
      }
    },
  },
};
</script>
