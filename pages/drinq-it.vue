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
import { get, call } from 'vuex-pathify';
import UpdateReviewMutation from '@/graphql/mutations/Review/UpdateReview.gql';

export default {
  computed: {
    cocktail: get('drinq-it/cocktail'),
    nextCocktail: get('drinq-it/nextCocktail'),
    isBackNavigation: get('navigation/isBackNavigation'),
  },
  mounted() {
    if (!this.isBackNavigation) {
      this.reset();
      this.fetchNextCocktail();
    }
  },
  methods: {
    fetchNextCocktail: call('drinq-it/fetch'),
    reset: call('drinq-it/reset'),

    onAccepted() {
      this.$apolloProvider.defaultClient.mutate({
        mutation: UpdateReviewMutation,
        variables: {
          cocktailId: this.cocktail.id,
          bookmarked: this.cocktail.review?.bookmarked,
          liked: true,
        },
      });

      this.fetchNextCocktail();
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

      this.fetchNextCocktail();
    },
  },
};
</script>
