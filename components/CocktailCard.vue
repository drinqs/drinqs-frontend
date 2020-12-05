<template>
  <div class="rounded-md shadow-lg mx-auto">
    <div class="w-full h-2/3 rounded-md rounded-b-none">
      <img
        :src="cocktail.imageSrc"
        :alt="cocktail.name"
        class="max-h-full h-full w-full min-w-full rounded-md rounded-b-none object-cover"
      >
    </div>

    <div class="p-3 w-full h-1/3">
      <div class="flex items-center mb-6 justify-between">
        <div class="inline-flex items-center">
          <h1 class="font-bold text-lg text-secondary">
            {{ cocktail.name }}
          </h1>
          <Drink v-if="cocktail.alcoholic" class="h-4 w-4 xxs:w-6 xxs:h-6" />
        </div>

        <div class="inline-flex">
          <button
            type="button"
            class="cursor-pointer text-red-500 hover:text-red-600 mr-4 inline-flex items-center justify-center
              focus:outline-none"
            @click.prevent.stop="onFavoriteClick"
          >
            <span class="sr-only">Mark as favorite</span>
            <HeartSolid v-if="isFavorite" class="w-6 h-6" />
            <Heart v-else class="w-6 h-6" />
          </button>

          <button
            type="button"
            class="cursor-pointer text-gray-600 hover:text-gray-700 inline-flex items-center justify-center"
            @click.prevent.stop="onFavoriteClick"
          >
            <span class="sr-only">Share via URL</span>
            <Share class="h-6 w-6" />
          </button>
        </div>
      </div>

      <div class="w-full mb-6 text-secondary text-base">
        {{ ingredientsList }}
      </div>

      <div class="w-full flex items-center justify-between">
        <button
          type="button"
          class="button button-secondary"
          @click="onReject"
        >
          <span class="sr-only">No</span>
          <X class="w-6 h-6" />
        </button>

        <button
          type="button"
          class="button button-primary"
          @click="onAccept"
        >
          <span class="sr-only">Yes</span>
          <Check class="w-6 h-6" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CocktailCard',
  props: {
    cocktail: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      // TODO
      isFavorite: false,
    };
  },
  computed: {
    ingredientsList() {
      return this.cocktail.ingredients.map((ingredient) => ingredient.name).join(', ');
    },
  },
  methods: {
    onFavoriteClick() {
      // TODO: VueX Store action?
      this.isFavorite = !this.isFavorite;
    },
    onShare() {
      // TODO: show modal with link to be copied?
    },
    onAccept() {
      this.$emit('accept', this.cocktail);
    },
    onReject() {
      this.$emit('reject', this.cocktail);
    },
  },
};
</script>
