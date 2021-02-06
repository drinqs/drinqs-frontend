<template>
  <button
    type="button"
    class="cursor-pointer text-primary hover:text-primary-dark mr-2 inline-flex items-center justify-center
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
        bookmarked: null,
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
      const bookmarked = this.isBookmarked ? null : true;

      const { data } = await this.$apolloProvider.defaultClient.mutate({
        mutation: UpdateReviewMutation,
        variables: {
          cocktailId: this.cocktailId,
          liked: this.review?.liked,
          bookmarked,
        },
      });

      this.$emit('change', data.review.review);
    },
  },
};
</script>
