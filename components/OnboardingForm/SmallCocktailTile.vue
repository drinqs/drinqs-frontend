<template>
  <div
    class="cocktail-tile shadow-md rounded-md w-full xs:max-w-xl flex bg-white p-2 relative cursor-pointer"
    :class="{ 'bg-orange-100': selected }"
    :title="cocktail.title"
    @click.prevent.stop="$emit('click')"
  >
    <div class="w-20 h-20 min-w-20 xs:w-24 xs:h-24 xs:min-w-24 p-1 flex items-center">
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
      <span v-show="selected" class="absolute top-2 right-2">
        <Bookmark solid class="h-8 w-8 text-primary" />
      </span>

      <div class="flex items-center mb-1">
        <span class="cocktail-tile--heading font-bold text-base xs:text-lg text-secondary truncate">
          {{ cocktail.name }}
        </span>
      </div>

      <div class="text-base truncate text-secondary mb-3">
        {{ ingredientsList }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SmallCocktailTile',
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
