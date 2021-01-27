<template>
  <div class="max-w-lg mx-auto w-full">
    <div class="flex items-center justify-between mb-4">
      <h1 class="flex items-center">
        <span class="text-secondary font-bold text-xl ">{{ cocktail.name }}</span>
        <Drink v-if="cocktail.alcoholic" class="inline h-6 w-6" />
      </h1>

      <div class="flex items-center">
        <button
          type="button"
          class="cursor-pointer text-red-500 hover:text-red-600 mr-2 inline-flex items-center justify-center
            focus:outline-none"
          @click.prevent.stop="onBookmark"
        >
          <span class="sr-only">Mark as favorite</span>
          <HeartSolid v-if="isBookmarked" class="w-6 h-6" />
          <Heart v-else class="w-6 h-6" />
        </button>

        <button
          type="button"
          class="cursor-pointer text-gray-600 hover:text-gray-700 inline-flex items-center justify-center
            focus:outline-none"
          @click.prevent.stop="onShare"
        >
          <span class="sr-only">Share via URL</span>
          <Share class="h-6 w-6" />
        </button>
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
        <div class="flex items-center">
          <button
            type="button"
            class="cursor-pointer text-secondary hover:text-secondary-dark mr-2 inline-flex items-center justify-center
              focus:outline-none"
            @click.prevent.stop="onReview('like')"
          >
            <span class="sr-only">Like</span>
            <ThumbUpSolid v-if="isLiked" class="w-6 h-6" />
            <ThumbUp v-else class="w-6 h-6" />
          </button>

          <button
            type="button"
            class="cursor-pointer text-secondary hover:text-secondary-dark inline-flex items-center justify-center
              focus:outline-none"
            @click.prevent.stop="onReview('dislike')"
          >
            <span class="sr-only">Dislike</span>
            <ThumbDownSolid v-if="isDisliked" class="w-6 h-6" />
            <ThumbDown v-else class="w-6 h-6" />
          </button>
        </div>
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
        dot-color="bg-pink-400"
        text-color="text-pink-700"
        background-color="bg-pink-100"
        hover-color="hover:bg-pink-500"
        class="w-fit"
      >
        {{ cocktail.category }}
      </Badge>
    </div>

    <ShareModal
      v-show="showShareModal"
      :show="showShareModal"
      :cocktail="cocktail"
      @close="showShareModal = false"
    />
  </div>
</template>

<script>
import FindCocktailQuery from '@/graphql/queries/Cocktail/FindCocktail.gql';
import GetReviewQuery from '@/graphql/queries/Cocktail/GetReview.gql';
import UpdateReviewMutation from '@/graphql/mutations/Review/UpdateReview.gql';
import Badge from '~/components/Badge.vue';

export default {
  components: { Badge },
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
        bookmarked: null,
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
    isBookmarked() {
      return this.review?.bookmarked;
    },
    isLiked() {
      return this.review?.liked === true;
    },
    isDisliked() {
      return this.review?.liked === false;
    },
    recipe() {
      const sortedIngredients = [...this.cocktail.cocktailIngredients].sort((a, b) => a.position - b.position);
      return sortedIngredients.map((cocktailIngredient) => ({
        measurement: cocktailIngredient.measurement,
        name: cocktailIngredient.ingredient.name,
      }));
    },
  },
  methods: {
    // rating is either 'like' or 'dislike'
    async onReview(rating) {
      let liked;
      if (rating === 'like') {
        liked = this.isLiked ? null : true;
      } else {
        liked = this.isDisliked ? null : false;
      }

      const { data } = await this.$apolloProvider.defaultClient.mutate({
        mutation: UpdateReviewMutation,
        variables: {
          cocktailId: this.cocktail.id,
          liked,
        },
      });

      this.review = data.review.review;
    },

    // isBookmarked is either true or false
    async onBookmark() {
      const bookmarked = this.isBookmarked ? null : true;

      const { data } = await this.$apolloProvider.defaultClient.mutate({
        mutation: UpdateReviewMutation,
        variables: {
          cocktailId: this.cocktail.id,
          bookmarked,
        },
      });

      this.review = data.review.review;
    },

    onShare() {
      this.showShareModal = true;
    },
  },
};
</script>
