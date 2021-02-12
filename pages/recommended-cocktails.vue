<template>
  <div class="max-w-lg mx-auto w-full">
    <h1 class="text-secondary font-bold text-xl mb-4">
      Your Recommended Cocktails
    </h1>

    <CocktailTile
      v-for="(cocktail, index) in cocktails"
      :key="`${cocktail.slug}-${index}`"
      :cocktail="cocktail"
      class="mb-8"
    />

    <Spinner
      v-show="loading"
      class="text-secondary h-12 w-12 mx-auto"
    />
  </div>
</template>

<script>
import { get, call } from 'vuex-pathify';

export default {
  computed: {
    loading: get('recommended-cocktails/loading'),
    cocktails: get('recommended-cocktails/cocktails'),
    isBackNavigation: get('navigation/isBackNavigation'),
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
    if (!this.isBackNavigation) {
      this.reset();
      window.scrollTo(0, 0);
      this.fetchCocktails();
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    reset: call('recommended-cocktails/reset'),
    fetchCocktails: call('recommended-cocktails/fetch'),

    onScroll() {
      // if bottom of page reached
      if (document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight * 0.67) {
        this.fetchCocktails();
      }
    },
  },
};
</script>
