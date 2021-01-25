<template>
  <div class="max-w-lg mx-auto w-full">
    <h1 class="text-secondary font-bold text-xl mb-4">
      Your Recommended Cocktails
    </h1>

    <CocktailTile
      v-for="cocktail in cocktails"
      :key="cocktail.slug"
      :cocktail="cocktail"
      class="mb-8"
    />

    <Spinner
      v-show="$fetchState.pending"
      class="text-secondary h-12 w-12 mx-auto"
    />
  </div>
</template>

<script>
import RecommendedCocktailsQuery from '@/graphql/queries/Cocktail/RecommendedCocktails.gql';

export default {
  data() {
    return {
      cocktails: [],
      endCursor: null,
      nextPageAvailable: true,
    };
  },
  async fetch() {
    const variables = { first: 10 };
    if (this.endCursor) variables.after = this.endCursor;

    const { data } = await this.$apolloProvider.defaultClient.query({
      query: RecommendedCocktailsQuery,
      variables,
    });

    this.endCursor = data.recommendedCocktails.pageInfo.endCursor;
    this.nextPageAvailable = data.recommendedCocktails.pageInfo.hasNextPage;

    this.cocktails.push(...data.recommendedCocktails.cocktails);
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
  },
};
</script>
