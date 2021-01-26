<template>
  <div class="max-w-lg mx-auto w-full">
    <h1 class="text-secondary font-bold text-xl mb-2">
      Drinq It!
    </h1>

    <CocktailCard
      v-if="cocktail && cocktail.slug"
      :key="cocktail.slug"
      :cocktail="cocktail"
      :style="{ height: '32rem' }"
      @accept="onAccepted"
      @reject="onRejected"
    />
  </div>
</template>

<script>
import NextCocktailQuery from '@/graphql/queries/Cocktail/NextCocktail.gql';
import UpdateReviewMutation from '@/graphql/mutations/Review/UpdateReview.gql';

export default {
  data() {
    return {
      cocktail: null,
      nextCocktail: null,
    };
  },
  async fetch() {
    if (this.nextCocktail?.slug) {
      this.cocktail = this.nextCocktail;
    } else {
      const { data } = await this.$apolloProvider.defaultClient.query({ query: NextCocktailQuery });
      this.cocktail = data.nextCocktail;
    }

    const { data: secondQuery } = await this.$apolloProvider.defaultClient.query({ query: NextCocktailQuery });
    this.nextCocktail = secondQuery.nextCocktail;
  },
  methods: {
    onAccepted() {
      this.$apolloProvider.defaultClient.mutate({
        mutation: UpdateReviewMutation,
        variables: {
          cocktailId: this.cocktail.id,
          bookmarked: true,
        },
      });

      this.$fetch();
    },
    onRejected() {
      this.$apolloProvider.defaultClient.mutate({
        mutation: UpdateReviewMutation,
        variables: {
          cocktailId: this.cocktail.id,
          bookmarked: false,
        },
      });

      this.$fetch();
    },
  },
};
</script>
