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
          <button
            type="button"
            class="cursor-pointer text-red-500 hover:text-red-600 mr-8 inline-flex items-center justify-center
              focus:outline-none"
            @click.prevent.stop="onFavoriteClick"
          >
            <span class="sr-only">Mark as favorite</span>
            <HeartSolid v-if="isBookmarked" class="w-6 h-6" />
            <Heart v-else class="w-6 h-6" />
          </button>

          <button
            type="button"
            class="cursor-pointer text-gray-600 hover:text-gray-700 inline-flex items-center justify-center
              focus:outline-none"
            @click.prevent.stop="onShare"
          >
            <span class="sr-only">Share via URL</span>
            <Share class="h-6 w-6" />
          </button>
        </div>
      </div>

      <ShareModal
        v-show="showShareModal"
        :show="showShareModal"
        :cocktail="cocktail"
        @close="showShareModal = false"
      />
    </div>
  </NuxtLink>
</template>

<script>
import UpdateReviewMutation from '@/graphql/mutations/Review/UpdateReview.gql';

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
    };
  },
  computed: {
    ingredientsList() {
      return this.cocktail.ingredients.map((ingredient) => ingredient.name).join(', ');
    },
    isBookmarked() {
      return this.cocktail.review?.bookmarked;
    },
  },
  methods: {
    async onFavoriteClick() {
      const { data } = await this.$apolloProvider.defaultClient.mutate({
        mutation: UpdateReviewMutation,
        variables: {
          cocktailId: this.cocktail.id,
          bookmarked: this.isBookmarked ? null : true,
        },
      });

      if (!this.cocktail.review) {
        this.$set(this.cocktail, 'review', {});
      }

      this.$set(this.cocktail.review, 'bookmarked', data.review.review.bookmarked);

      const event = this.cocktail.review.bookmarked ? 'add-bookmark' : 'remove-bookmark';
      this.$emit(event);
    },
    onShare() {
      this.showShareModal = true;
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
