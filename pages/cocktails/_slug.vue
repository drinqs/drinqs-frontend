<template>
  <div class="max-w-lg mx-auto w-full">
    <div class="flex items-center justify-between mb-4">
      <h1 class="flex items-center">
        <span class="text-secondary font-bold text-xl ">
          {{ cocktail.name }}
          <Drink v-if="cocktail.alcoholic" class="inline h-6 w-6" />
        </span>
      </h1>

      <div class="flex items-center">
        <BookmarkButton v-model="review" :cocktail-id="cocktail.id" class="mr-2" />
        <ShareButton :cocktail="cocktail" />
      </div>
    </div>

    <div class="relative w-full rounded-md mb-4">
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

      <div class="absolute right-0 mt-4">
        <ReviewSection v-model="review" :cocktail-id="cocktail.id" />
      </div>
    </div>

    <div
      v-if="cocktail.glass"
      class="w-full mb-4"
    >
      <h2 class="font-semibold text-secondary text-lg mb-1">
        Served in ...
      </h2>

      <p>{{ cocktail.glass.name }}</p>
    </div>

    <div class="w-full mb-4">
      <h2 class="font-semibold text-secondary text-lg mb-1">
        Ingredients
      </h2>

      <table class="table-fixed">
        <tbody>
          <tr
            v-for="ingredient in recipe"
            :key="ingredient.name"
          >
            <td class="px-2 py-1">
              {{ ingredient.measurement }}
            </td>
            <td class="px-2 py-1">
              {{ ingredient.name }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="cocktail.preparation"
      class="w-full mb-4"
    >
      <h2 class="font-semibold text-secondary text-lg mb-1">
        Preparation
      </h2>

      <p class="px-2 py-1">
        {{ cocktail.preparation }}
      </p>
    </div>

    <div
      v-if="cocktail.category"
      class="w-full mb-2"
    >
      <h2 class="font-semibold text-secondary text-lg mb-1">
        Category
      </h2>

      <Badge
        dot-color="bg-orange-400"
        text-color="text-orange-700"
        background-color="bg-orange-100"
        hover-color="hover:bg-orange-500"
      >
        {{ cocktail.category }}
      </Badge>
    </div>
  </div>
</template>

<script>
import FindCocktailQuery from '@/graphql/queries/Cocktail/FindCocktail.gql';
import GetReviewQuery from '@/graphql/queries/Cocktail/GetReview.gql';

export default {
  async asyncData({ app, params, payload }) {
    if (payload) {
      return {
        cocktail: payload.cocktail,
      };
    }

    const { data } = await app.apolloProvider.defaultClient.query({
      query: FindCocktailQuery,
      variables: {
        slug: params.slug,
      },
    });

    return {
      cocktail: data.cocktail,
    };
  },
  data() {
    return {
      showShareModal: false,
      review: {
        liked: null,
        bookmarked: false,
      },
    };
  },
  async fetch() {
    const { params } = this.$nuxt.context;

    const { data } = await this.$apolloProvider.defaultClient.query({
      query: GetReviewQuery,
      variables: {
        cocktailSlug: params.slug,
      },
    });

    this.review = data.cocktail.review;
  },
  computed: {
    recipe() {
      const sortedIngredients = [...this.cocktail.cocktailIngredients].sort((a, b) => a.position - b.position);
      return sortedIngredients.map((cocktailIngredient) => ({
        measurement: cocktailIngredient.measurement,
        name: cocktailIngredient.ingredient.name,
      }));
    },
  },
};
</script>
