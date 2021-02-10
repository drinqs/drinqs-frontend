<template>
  <div class="max-w-lg mx-auto w-full">
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
      v-if="!cocktail || loading"
      class="text-secondary h-12 w-12 mx-auto mt-48"
    />
  </div>
</template>

<script>
import { get, call } from 'vuex-pathify';

export default {
  computed: {
    cocktail: get('drinq-it/cocktail'),
    loading: get('drinq-it/loading'),
    isBackNavigation: get('navigation/isBackNavigation'),
  },
  mounted() {
    if (!this.isBackNavigation) {
      this.reset();
      this.fetchNextCocktail();
    }
  },
  methods: {
    fetchNextCocktail: call('drinq-it/fetchNextCocktail'),
    review: call('drinq-it/review'),
    reset: call('drinq-it/reset'),

    async onAccepted() {
      this.review({ review: 'liked' });
    },
    async onRejected() {
      this.review({ review: 'disliked' });
    },
  },
};
</script>
