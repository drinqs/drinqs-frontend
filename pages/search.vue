<template>
  <div class="max-w-lg mx-auto w-full">
    <h1 class="text-secondary font-bold text-xl mb-2">
      Search our Cocktails
    </h1>

    <SearchInput class="w-full mb-4" />

    <CocktailTile
      v-for="cocktail in searchResults"
      :key="cocktail.slug"
      :cocktail="cocktail"
      class="mb-8"
    />

    <Spinner
      v-if="loading"
      class="text-secondary h-12 w-12 mx-auto"
    />

    <div
      v-else-if="searchResults.length === 0"
      class="w-fit mx-auto mt-8 text-secondary font-semibold"
    >
      Sorry. No cocktails found.
    </div>
  </div>
</template>

<script>
import { get, call } from 'vuex-pathify';
import { mapActions } from 'vuex';

export default {
  computed: {
    loading: get('search/loading'),
    error: get('search/error'),
    searchResults: get('search/searchResults'),
    isBackNavigation: get('navigation/isBackNavigation'),
  },
  watch: {
    error(error) {
      if (error) {
        this.$notification.error(error);
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
    if (!this.isBackNavigation) {
      this.resetSearch();
      window.scrollTo(0, 0);
      this.performSearch();
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    ...mapActions('search', ['setSearchResults', 'performSearch']),
    resetSearch: call('search/reset'),

    onScroll() {
      // if bottom of page reached
      if (document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight * 0.67) {
        this.performSearch();
      }
    },
  },
};
</script>
