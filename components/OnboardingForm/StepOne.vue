<template>
  <div>
    <h2 class="text-secondary font-semibold mb-2">
      Thanks for signing up!
    </h2>

    <div class="h-full w-full pb-2 flex flex-col text-sm xs:text-base">
      <div class="mb-2">
        <p>
          <span class="text-underline text-primary font-semibold">drinqs.de</span>
          <!-- eslint-disable-next-line max-len -->
          comes with 3 modes<span class="hidden 2xs:inline"> you can use to search your favorite cocktails and discover your personalized recommendations</span>:
        </p>
      </div>

      <div class="w-full flex-auto overflow-y-scroll">
        <div
          v-for="mode in modes"
          :key="`explanation-${mode.title}`"
          class="w-full flex items-center"
        >
          <div class="flex items-center w-16 h-16">
            <component :is="mode.imageComponent" class="max-h-full h-full w-full min-w-full object-cover" />
          </div>

          <div class="h-full w-full p-2 2xs:p-4 2xs:mb-2">
            <div class="font-semibold text-secondary">
              {{ mode.title }}
            </div>
            <p>{{ mode.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modes: [
        {
          imageComponent: 'having-fun',
          title: 'Drinq It!',
          description: 'A tinder-like mode for discovering cocktails',
        },
        {
          imageComponent: 'wine-tasting',
          title: 'Cocktails',
          description: 'Your personalized recommendations',
        },
        {
          imageComponent: 'searching',
          title: 'Search',
          description: 'Search for a specific cocktail / ingredient',
        },
      ],
    };
  },
};
</script>
