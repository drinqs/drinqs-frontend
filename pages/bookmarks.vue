<template>
  <div class="max-w-lg mx-auto w-full">
    <h1 class="text-secondary font-bold text-xl mb-4">
      Your Bookmarks
    </h1>

    <CocktailTile
      v-for="(cocktail, index) in bookmarks"
      :key="cocktail.slug"
      :cocktail="cocktail"
      class="mb-8"
      @remove-bookmark="onRemoveBookmark(index)"
    />

    <Spinner
      v-show="$fetchState.pending"
      class="text-secondary h-12 w-12 mx-auto"
    />
  </div>
</template>

<script>
import BookmarksQuery from '@/graphql/queries/User/Bookmarks.gql';

export default {
  data() {
    return {
      bookmarks: [],
      endCursor: null,
      nextPageAvailable: true,
    };
  },
  async fetch() {
    const variables = { first: 10 };
    if (this.endCursor) variables.after = this.endCursor;

    const { data } = await this.$apolloProvider.defaultClient.query({
      query: BookmarksQuery,
      variables,
    });

    this.endCursor = data.bookmarks.pageInfo.endCursor;
    this.nextPageAvailable = data.bookmarks.pageInfo.hasNextPage;

    this.bookmarks.push(...data.bookmarks.cocktails);
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    onScroll() {
      // if bottom of page reached
      if (document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight) {
        if (this.nextPageAvailable) this.$fetch();
      }
    },

    onRemoveBookmark(cocktailIndex) {
      // remove cocktail from list if no longer bookmarked
      this.bookmarks.splice(cocktailIndex, 1);
    },
  },
};
</script>
