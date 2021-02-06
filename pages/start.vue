<template>
  <div class="max-w-lg mx-auto w-full">
    <h1 class="text-secondary font-bold text-xl mb-4">
      Choose a mode!
    </h1>

    <NuxtLink
      v-for="link in links"
      :key="link.to"
      v-slot="{ navigate }"
      :to="link.to"
    >
      <div
        class="flex relative h-32 w-full mb-8 rounded-lg cursor-pointer
          transition-all duration-300 ease-in-out
          border-2 border-secondary justify-center items-center
          bg-white hover:bg-secondary-seethrough
        "
        @click="navigate"
      >
        <component :is="link.icon" class="absolute h-20 w-auto right-0 mr-4" />
        <span class="absolute left-0 ml-4 z-10 text-secondary font-bold text-3xl ">{{ link.text }}</span>
      </div>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          text: 'Drinq It!',
          to: '/drinq-it',
          icon: 'having-fun',
        },
        {
          text: 'Cocktails',
          to: '/recommended-cocktails',
          icon: 'wine-tasting',
        },
        {
          text: 'Search',
          to: '/search',
          icon: 'searching',
        },
      ],
    };
  },
};
</script>
