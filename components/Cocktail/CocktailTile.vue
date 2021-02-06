<template>
  <NuxtLink
    v-slot="{ navigate }"
    :to="`/cocktails/${cocktail.slug}`"
  >
    <div
      class="cocktail-tile shadow-lg rounded-md w-full xs:max-w-xl flex bg-white p-2 relative cursor-pointer"
      :title="cocktail.title"
      @click.stop="navigate"
    >
      <div class="w-28 h-28 min-w-28 xs:w-32 xs:h-32 xs:min-w-32 p-1 flex items-center">
        <img
          v-if="cocktail.thumbnailUrl"
          :src="cocktail.thumbnailUrl"
          :alt="cocktail.name"
          class="max-h-full h-full w-full min-w-full rounded-md object-cover"
        >

        <BeerCelebration
          v-else
          class="max-h-full h-full w-full min-w-full rounded-md object-cover"
        />
      </div>

      <div class="cocktail-info w-full h-full p-2 xs:max-w-full overflow-hidden">
        <div class="flex items-center mb-3">
          <span class="cocktail-tile--heading font-bold text-base xs:text-lg text-secondary truncate">
            {{ cocktail.name }}
          </span>
          <Drink v-if="cocktail.alcoholic" class="inline h-4 w-4 xxs:w-6 xxs:h-6" />
        </div>

        <div class="text-base truncate text-secondary mb-3">
          {{ ingredientsList }}
        </div>

        <div class="flex items-center absolute bottom-0 right-0 mb-3 mr-3">
          <ReviewSection v-model="review" :cocktail-id="cocktail.id" class="inline-flex mr-8" />
          <BookmarkButton v-model="review" :cocktail-id="cocktail.id" class="mr-8" />
          <ShareButton :cocktail="cocktail" />
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script>
/* eslint-disable func-names */
export default {
  name: 'CocktailTile',
  props: {
    cocktail: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showShareModal: false,
      review: this.cocktail.review,
    };
  },
  computed: {
    ingredientsList() {
      return this.cocktail.ingredients.map((ingredient) => ingredient.name).join(', ');
    },
  },
  watch: {
    'review.liked': function () {
      let action;
      if (this.review.liked === null) action = 'unset-review';
      else if (this.review.liked) action = 'like';
      else action = 'dislike';

      this.$emit('action', { action });
    },
    'review.bookmarked': function () {
      const action = this.review.bookmarked ? 'add-bookmark' : 'remove-bookmark';

      this.$emit('action', { action });
    },
  },
};
</script>

<style lang="scss" scoped>
.cocktail-info {
  max-width: calc(95vw - 7rem);
}

.cocktail-tile:hover {
  .cocktail-tile--heading {
    @apply underline;
  }
}
</style>
