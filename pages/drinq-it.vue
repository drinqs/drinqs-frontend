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
    >
      <template #pending>
        <Spinner class="text-secondary h-12 w-12 mx-auto mt-48" />
      </template>
    </CocktailCard>

    <Spinner
      v-else
      class="text-secondary h-12 w-12 mx-auto mt-48"
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
          bookmarked: this.cocktail.review?.bookmarked,
          liked: true,
        },
      });

      this.$fetch();
    },
    onRejected() {
      this.$apolloProvider.defaultClient.mutate({
        mutation: UpdateReviewMutation,
        variables: {
          cocktailId: this.cocktail.id,
          bookmarked: this.cocktail.review?.bookmarked,
          liked: false,
        },
      });

      this.$fetch();
    },
  },
};
</script>
