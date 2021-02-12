<template>
  <div class="h-full w-full pb-2 flex flex-col text-sm xs:text-base">
    <div class="mb-2">
      To get started with <span class="font-medium text-primary">drinqs.de</span>,
      <span class="hidden 2xs:inline">
        we need a first impression of your taste buds. Choose
      </span><span class="2xs:hidden">choose</span>
      1-6 cocktails you know and like:
    </div>

    <SearchInput class="mb-2" />
    <div v-show="chosenCocktails.length > 0" class="w-full flex flex-row flex-wrap mb-2">
      <Badge
        v-for="(cocktail, index) in chosenCocktails"
        :key="`chosen-${cocktail.slug}`"
        text-color="text-orange-700"
        background-color="bg-orange-100"
        removable
        class="max-w-20 2xs:max-w-24 sm:max-w-none mr-1 mb-1"
        @remove="onRemove({ cocktailIndex: index, cocktail })"
      >
        <span class="truncate">{{ cocktail.name }}</span>
      </Badge>
    </div>

    <div class="w-full p-1 overflow-y-scroll flex-auto" @scroll="onScroll">
      <SmallCocktailTile
        v-for="cocktail in searchResults"
        :key="cocktail.slug"
        :cocktail="cocktail"
        :selected="isChosen(cocktail)"
        class="mb-3"
        @click="addCocktail(cocktail)"
      />

      <Spinner
        v-if="loading"
        class="text-secondary h-10 w-10 mx-auto mt-4"
      />

      <div
        v-else-if="searchResults.length === 0"
        class="w-fit mx-auto mt-4 text-secondary font-medium"
      >
        Sorry. No cocktails found.
      </div>
    </div>
  </div>
</template>

<script>
import { get, call } from 'vuex-pathify';
import UpdateReviewMutation from '@/graphql/mutations/Review/UpdateReview.gql';

const MAX_CHOICES = 6;

export default {
  props: {
    initialChosenCocktails: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      chosenCocktails: this.initialChosenCocktails,
    };
  },
  computed: {
    loading: get('search/loading'),
    error: get('search/error'),
    searchResults: get('search/searchResults'),
  },
  watch: {
    error(error) {
      if (error) {
        this.$notification.error(error);
      }
    },
    chosenCocktails() {
      this.$emit('cocktail-choice', { choices: this.chosenCocktails.length });
    },
  },
  mounted() {
    this.resetSearch();
    this.performSearch();
    this.$emit('cocktail-choice', { choices: this.chosenCocktails.length });
  },
  methods: {
    performSearch: call('search/performSearch'),
    resetSearch: call('search/reset'),

    isChosen({ slug: cocktailSlug }) {
      return this.chosenCocktails.findIndex((cocktail) => cocktail.slug === cocktailSlug) !== -1;
    },
    addCocktail(cocktail) {
      const cocktailIndex = this.chosenCocktails.findIndex((c) => c.slug === cocktail.slug);
      if (cocktailIndex !== -1) {
        this.onRemove({ cocktailIndex, cocktail });
      } else if (this.chosenCocktails.length === MAX_CHOICES) {
        this.$notification.warning('You can only choose up to 6 cocktails.');
      } else {
        this.chosenCocktails.push(cocktail);
        this.$_updateBookmark({ cocktail, bookmarked: true });
      }
    },
    onRemove({ cocktailIndex, cocktail }) {
      if (this.chosenCocktails.length === 1) {
        this.chosenCocktails.pop();
      } else {
        this.chosenCocktails.splice(cocktailIndex, 1);
      }

      this.$_updateBookmark({ cocktail, bookmarked: false });
    },
    async $_updateBookmark({ cocktail, bookmarked }) {
      await this.$apolloProvider.defaultClient.mutate({
        mutation: UpdateReviewMutation,
        variables: {
          cocktailId: cocktail.id,
          liked: cocktail.review?.liked,
          bookmarked,
        },
      });
    },

    onScroll({ target: cocktailList }) {
      // if bottom of container reached
      if (cocktailList.scrollTop >= (cocktailList.scrollHeight - cocktailList.offsetHeight) * 0.7) {
        this.performSearch();
      }
    },
  },
};
</script>
