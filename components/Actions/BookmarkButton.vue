<template>
  <button
    type="button"
    class="cursor-pointer text-primary hover:text-primary-dark inline-flex items-center justify-center
      focus:outline-none"
    @click.prevent.stop="onBookmark"
  >
    <span class="sr-only">Bookmark</span>
    <Bookmark :solid="isBookmarked" class="w-6 h-6" />
  </button>
</template>

<script>
import UpdateReviewMutation from '@/graphql/mutations/Review/UpdateReview.gql';

export default {
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
    isBookmarked() {
      return this.review?.bookmarked;
    },
  },
  methods: {
    // isBookmarked is either true or false
    async onBookmark() {
      const bookmarked = !this.isBookmarked;

      const { data } = await this.$apolloProvider.defaultClient.mutate({
        mutation: UpdateReviewMutation,
        variables: {
          cocktailId: this.cocktailId,
          liked: this.review?.liked,
          bookmarked,
        },
      });

      this.$emit('change', {
        liked: data.review.review.liked,
        bookmarked: data.review.review.bookmarked,
      });
    },
  },
};
</script>
