<template>
  <div class="w-full" :style="{ height: '75vh' }">
    <div :style="{ height: 'calc(75vh - 5rem)' }">
      <StepOne v-show="step === 1" />
      <StepTwo v-show="step === 2" />
      <StepThree v-show="step === 3" :initial-chosen-cocktails="initialChosenCocktails" />
    </div>

    <div class="w-full flex items-center justify-between px-4 mb-10">
      <div
        v-for="stepIndex in maxSteps"
        :key="`onboarding-step-${stepIndex}`"
        class="w-1/4 rounded-full text-xs leading-none text-center text-white cursor-pointer transform
          transition-all duration-300 ease-in-out"
        :class="{
          'bg-primary': step === stepIndex,
          'hover:bg-primary-dark': step === stepIndex,
          'bg-gray-300': step !== stepIndex,
          'hover:bg-gray-400': step !== stepIndex,
          'scale-y-125': step === stepIndex,
        }"
        :style="{ height: '6px', width: '28%' }"
        @click="step = stepIndex"
      />
    </div>

    <div class="w-full flex items-center justify-end">
      <button
        v-show="step > 1"
        type="button"
        class="button button-gray-outlined w-28 mr-4"
        @click="onPreviousStep"
      >
        Back
      </button>

      <button
        type="button"
        class="button button-primary w-28"
        @click="onNextStep"
      >
        {{ isCompleted ? 'Finish' : 'Next' }}
      </button>
    </div>
  </div>
</template>

<script>
import BookmarksQuery from '@/graphql/queries/User/Bookmarks.gql';

export default {
  data() {
    return {
      step: 1,
      maxSteps: 3,
      initialChosenCocktails: [],
    };
  },
  computed: {
    isCompleted() {
      return this.step === this.maxSteps;
    },
  },
  mounted() {
    this.$_loadBookmarkedCocktails();
  },
  methods: {
    onNextStep() {
      if (this.isCompleted) {
        this.$emit('complete');
      } else {
        this.step += 1;
      }
    },
    onPreviousStep() {
      if (this.step > 1) {
        this.step -= 1;
      }
    },

    async $_loadBookmarkedCocktails() {
      const { data } = await this.$apolloProvider.defaultClient.query({
        query: BookmarksQuery,
        variables: {
          first: 6,
        },
      });

      this.initialChosenCocktails = data.bookmarks.cocktails;
    },
  },
};
</script>
