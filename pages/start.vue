<template>
  <div class="max-w-lg mx-auto w-full">
    <h1 class="text-secondary font-bold text-xl mb-4">
      Choose a mode!
    </h1>

    <NuxtLink
      v-for="link in links"
      :key="link.to"
      :to="link.to"
      class="block"
    >
      <div
        class="flex relative h-32 w-full mb-8 rounded-lg cursor-pointer
          text-secondary transition-all duration-300 ease-in-out
          border-2 border-secondary justify-center items-center
          bg-white hover:border-primary hover:text-primary"
      >
        <component :is="link.icon" class="absolute h-20 w-auto right-0 mr-4" />
        <span class="absolute left-0 ml-4 font-bold text-3xl ">{{ link.text }}</span>
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
