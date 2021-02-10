<template>
  <div class="relative bg-white overflow-hidden -mt-4 -mr-4 -ml-4">
    <div class="max-w-7xl mx-auto w-full">
      <div class="relative z-10 pb-8 bg-white lg:max-w-2xl lg:w-full pt-4 px-4">
        <svg
          class="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
          fill="currentColor"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polygon points="50,0 100,0 50,100 0,100" />
        </svg>

        <div class="sm:text-center lg:text-left">
          <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span class="block text-secondary">Welcome to drinqs!</span>
            <span class="block text-primary uppercase text-xl sm:text-2xl md:text-3xl lg:text-4xl">
              The Cocktail Recommender
            </span>
          </h1>
          <div
            class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
          >
            <p class="mb-1">
              You are in the mood to drink some cocktails, but you always choose the same?
            </p>
            <p class="mb-1">
              You want some cocktail recipes that fit your taste?
            </p>
            <p class="mb-1">
              Then, you've come to the right place!
            </p>
            <p>
              Here, you can quickly discover new cocktails that fit your taste,
              and you'll get their recipe as well!
            </p>
          </div>

          <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
            <template v-if="$auth.loggedIn">
              <div class="rounded-md shadow">
                <NuxtLink
                  to="/start"
                  class="w-full flex items-center justify-center px-8 py-3 text-base font-medium
                    button button-primary md:py-4 md:text-lg md:px-10"
                >
                  Get Started
                </NuxtLink>
              </div>
            </template>

            <template v-else>
              <div class="rounded-md shadow">
                <NuxtLink
                  to="/register"
                  class="w-full flex items-center justify-center px-8 py-3 text-base font-medium
                    button button-primary md:py-4 md:text-lg md:px-10"
                >
                  Register
                </NuxtLink>
              </div>
              <div class="mt-3 sm:mt-0 sm:ml-3">
                <NuxtLink
                  to="/login"
                  class="w-full flex items-center justify-center px-8 py-3 text-base font-medium
                    button button-gray-outlined md:py-4 md:text-lg md:px-10"
                >
                  Login
                </NuxtLink>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div class="h-fit lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:ml-0 -mr-8 -ml-8 bg-primary">
      <img
        class="sm:h-56 xs:h-96 h-72 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full mx-auto"
        :style="{ 'max-width': '600px' }"
        src="~/assets/images/cocktail.gif"
        alt=""
      >
    </div>

    <div class="max-w-7xl mx-auto w-full">
      <div class="w-full pt-4 px-4">
        <div class="w-full lg:flex">
          <div class="w-full lg:w-1/2 mb-6 lg:mb-0">
            <h2 class="font-bold text-secondary text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4">
              How it works:
            </h2>

            <div class="mb-2">
              <p>
                <span class="text-underline text-primary font-semibold">drinqs.de</span>
                comes with 3 modes you can use to search your favorite cocktails and
                discover your personalized recommendations:
              </p>
            </div>

            <div>
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

          <div class="w-full lg:w-1/2">
            <h2 class="font-bold text-secondary text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4">
              What we consider:
            </h2>

            <div class="mb-2">
              <p class="mb-1">
                You can review and bookmark any cocktail to tell us the preference of your taste buds.
                <span class="hidden xs:inline">
                  Remember, no matter how you mark a cocktail, it will always show up in the
                  <span class="font-medium text-primary">"Bookmarks & Reviews"</span>-section,
                  you can find on your avatar in the top right corner.
                </span>
              </p>
            </div>

            <div class="w-full flex-auto overflow-y-scroll">
              <div class="w-full flex items-center">
                <div class="flex items-center justify-center w-16 h-16">
                  <ThumbUpSolid class="w-6 h-6 mr-1 text-green-600" />
                  <ThumbDownSolid class="w-6 h-6 text-red-600" />
                </div>

                <div class="h-full w-full px-3 py-2 2xs:mb-2 xs:p-4">
                  <div class="font-semibold text-secondary">
                    Like / Dislike
                  </div>
                  <p>
                    In the (tinder-like) Drinq-it mode, you implicily <span class="font-medium">like</span>
                    or <span class="font-medium">dislike</span> the currently shown cocktail.
                    This action is
                    used as a <span class="font-medium text-primary">light indicator</span>
                    meaning you want to try it. Or never see it again. Your choice.
                  </p>
                </div>
              </div>

              <div class="w-full flex items-center">
                <div class="flex items-center justify-center w-16 h-16">
                  <Bookmark class="w-6 h-6 mr-1 text-primary" />
                  <Bookmark solid class="w-6 h-6 text-primary" />
                </div>

                <div class="h-full w-full px-3 py-2 2xs:p-4 2xs:mb-2">
                  <div class="font-semibold text-secondary">
                    Bookmark
                  </div>
                  <p>
                    Naturally, you can bookmark a cocktail.
                    This is used as a <span class="font-medium text-primary">heavy indicator</span>
                    meaning that you tried the cocktail and / or really like it.
                    We will try to find more of those for you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
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
