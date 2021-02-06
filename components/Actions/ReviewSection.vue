<template>
  <div class="flex items-center">
    <button
      type="button"
      class="cursor-pointer mr-2 inline-flex items-center justify-center
        focus:outline-none"
      @click.prevent.stop="onReview('like')"
    >
      <span class="sr-only">Like</span>
      <ThumbUpSolid v-if="isLiked" class="w-6 h-6 text-green-600 hover:text-green-700" />
      <ThumbUp v-else class="w-6 h-6 text-secondary hover:text-secondary-dark" />
    </button>

    <button
      type="button"
      class="cursor-pointer inline-flex items-center justify-center
        focus:outline-none"
      @click.prevent.stop="onReview('dislike')"
    >
      <span class="sr-only">Dislike</span>
      <ThumbDownSolid v-if="isDisliked" class="w-6 h-6 text-red-600 hover:text-red-700" />
      <ThumbDown v-else class="w-6 h-6 text-secondary hover:text-secondary-dark" />
    </button>
  </div>
</template>

<script>
import UpdateReviewMutation from '@/graphql/mutations/Review/UpdateReview.gql';

export default {
  name: 'ReviewSection',
  model: {
    prop: 'review',
    event: 'change',
  },
  props: {
    cocktailId: {
      type: [Number, String],
      required: true,
    },
    review: {
      type: Object,
      default: () => ({
        liked: null,
        bookmarked: false,
      }),
    },
  },
  computed: {
    isLiked() {
      return this.review?.liked === true;
    },
    isDisliked() {
      return this.review?.liked === false;
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
          cocktailId: this.cocktailId,
          liked,
          bookmarked: this.review?.bookmarked,
        },
      });

      this.$emit('change', data.review.review);
    },
  },
};
</script>
