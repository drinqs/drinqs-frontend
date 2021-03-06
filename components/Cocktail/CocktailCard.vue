<template>
  <div>
    <div
      v-show="thumbnailLoaded"
      class="rounded-md shadow-lg mx-auto"
    >
      <div class="w-full h-2/3 rounded-md rounded-b-none">
        <NuxtLink
          :to="`/cocktails/${cocktail.slug}`"
          class="block"
        >
          <img
            v-if="hasThumbnail"
            :src="cocktail.thumbnailUrl"
            :alt="cocktail.name"
            class="max-h-full h-full w-full min-w-full rounded-md rounded-b-none object-cover"
            v-on="thumbnailEventListeners"
          >
          <div
            v-else
            :style="{ 'aspect-ratio': 1 }"
            class="align-middle"
          >
            <BeerCelebration
              class="max-h-full h-full w-full min-w-full rounded-md rounded-b-none object-cover"
            />
          </div>
        </NuxtLink>
      </div>

      <div class="p-3 w-full h-1/3">
        <div class="flex items-center mb-6 justify-between">
          <div class="inline-flex items-center">
            <span class="font-bold text-lg text-secondary">
              {{ cocktail.name }}
              <Drink v-if="cocktail.alcoholic" class="inline h-4 w-4 3xs:w-6 3xs:h-6" />
            </span>
          </div>

          <div class="inline-flex">
            <BookmarkButton v-model="review" :cocktail-id="cocktail.id" class="mr-2" @change="onReviewChange" />
            <ShareButton :cocktail="cocktail" />
          </div>
        </div>

        <div class="w-full mb-6 text-secondary text-base truncate">
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

    <slot v-if="!thumbnailLoaded" name="pending" />
  </div>
</template>

<script>
import hasThumbnail from '@/mixins/has-thumbnail';

export default {
  name: 'CocktailCard',
  mixins: [
    hasThumbnail,
  ],
  props: {
    cocktail: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      review: this.cocktail.review,
    };
  },
  computed: {
    ingredientsList() {
      return this.cocktail.ingredients.map((ingredient) => ingredient.name).join(', ');
    },
  },
  methods: {
    onAccept() {
      this.$emit('accept', this.cocktail);
    },
    onReject() {
      this.$emit('reject', this.cocktail);
    },

    onReviewChange() {
      this.$store.dispatch(
        'drinq-it/setReview',
        {
          review: this.review,
          cocktailId: this.cocktail.id,
        },
      );
    },
  },
};
</script>
