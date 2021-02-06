<template>
  <div class="inline-flex items-center">
    <button
      type="button"
      class="cursor-pointer text-gray-600 hover:text-gray-700 inline-flex items-center justify-center
        focus:outline-none"
      @click.prevent.stop="showShareModal = true"
    >
      <span class="sr-only">Share via URL</span>
      <Share class="h-6 w-6" />
    </button>

    <ShareModal
      v-show="showShareModal"
      :show="showShareModal"
      :cocktail="cocktail"
      @close="showShareModal = false"
    />
  </div>
</template>

<script>
export default {
  props: {
    cocktail: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showShareModal: false,
    };
  },
};
</script>
