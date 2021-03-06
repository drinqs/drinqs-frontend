<template>
  <div
    class="cocktail-tile shadow-md rounded-md w-full xs:max-w-xl flex bg-white p-2 relative cursor-pointer"
    :class="{ 'bg-orange-100': selected }"
    :title="cocktail.title"
    @click.prevent.stop="$emit('click')"
  >
    <div class="w-16 h-16 min-w-16 2xs:w-20 2xs:h-20 2xs:min-w-20 xs:w-24 xs:h-24 xs:min-w-24 p-1 flex items-center">
      <img
        v-if="hasThumbnail"
        :src="cocktail.thumbnailUrl"
        :alt="cocktail.name"
        class="max-h-full h-full w-full min-w-full rounded-md object-cover"
        v-on="thumbnailEventListeners"
      >

      <BeerCelebration
        v-else
        class="max-h-full h-full w-full min-w-full rounded-md object-cover"
      />
    </div>

    <div class="cocktail-info w-full h-full p-2 xs:max-w-full overflow-hidden">
      <span v-show="selected" class="absolute top-2 right-2">
        <Bookmark solid class="h-8 w-8 text-primary" />
      </span>

      <div class="flex items-center mb-1">
        <span class="cocktail-tile--heading font-bold text-sm 2xs:text-base xs:text-lg text-secondary truncate">
          {{ cocktail.name }}
        </span>
      </div>

      <div class="text-sm xs:text-base truncate text-secondary mb-3">
        {{ ingredientsList }}
      </div>
    </div>
  </div>
</template>

<script>
import hasThumbnail from '@/mixins/has-thumbnail';

export default {
  name: 'SmallCocktailTile',
  mixins: [
    hasThumbnail,
  ],
  props: {
    cocktail: {
      type: Object,
      required: true,
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ingredientsList() {
      return this.cocktail.ingredients.map((ingredient) => ingredient.name).join(', ');
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
