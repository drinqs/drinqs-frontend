<template>
  <div class="max-w-lg mx-auto w-full">
    <nav class="w-full flex mb-4">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        :class="tabCssClasses(tab)"
        @click="switchTab(tab)"
      >
        {{ tab.name }}
      </button>
    </nav>

    <CocktailTile
      v-for="(cocktail, index) in bookmarks"
      v-show="currentTab.key === 'bookmarks'"
      :key="`bookmark-${cocktail.slug}`"
      :cocktail="cocktail"
      class="mb-8"
      @action="onAction({ index, ...$event })"
    />

    <CocktailTile
      v-for="(cocktail, index) in likedCocktails"
      v-show="currentTab.key === 'likedCocktails'"
      :key="`like-${cocktail.slug}`"
      :cocktail="cocktail"
      class="mb-8"
      @action="onAction({ index, ...$event })"
    />

    <CocktailTile
      v-for="(cocktail, index) in dislikedCocktails"
      v-show="currentTab.key === 'dislikedCocktails'"
      :key="`dislike-${cocktail.slug}`"
      :cocktail="cocktail"
      class="mb-8"
      @action="onAction({ index, ...$event })"
    />

    <div
      v-show="currentListIsEmpty && !loading"
      class="font-semibold text-secondary w-full text-center mt-8"
    >
      Nothing to see here ...
    </div>

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
    ...get('navigation', ['isBackNavigation']),
    ...get('bookmarks', ['tabs', 'currentTab']),
    loading: get('bookmarks/currentMeta@loading'),
    currentListIsEmpty: get('bookmarks/currentListIsEmpty'),
    bookmarks: get('bookmarks/cocktails@bookmarks'),
    likedCocktails: get('bookmarks/cocktails@likedCocktails'),
    dislikedCocktails: get('bookmarks/cocktails@dislikedCocktails'),
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
    if (!this.isBackNavigation) {
      this.reset();
      window.scrollTo(0, 0);
      this.fetch();
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    ...call('bookmarks', ['reset', 'fetch', 'switchTab', 'onAction']),

    tabCssClasses(tab) {
      const isCurrentTab = this.currentTab.key === tab.key;

      return [
        'w-1/3', 'p-4', 'pt-0', 'block', 'focus:outline-none', 'text-sm',
        {
          'font-semibold': isCurrentTab,
          'text-gray-600': !isCurrentTab,
          'hover:text-secondary': !isCurrentTab,
          'text-secondary': isCurrentTab,
          'hover:text-secondary-dark': isCurrentTab,

          'border-b-2': isCurrentTab,
          'border-secondary': isCurrentTab,
          'border-b': !isCurrentTab,
          'border-gray-300': !isCurrentTab,
        },
      ];
    },

    onScroll() {
      // if bottom of page reached
      if (document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight * 0.67) {
        this.fetch();
      }
    },
  },
};
</script>
