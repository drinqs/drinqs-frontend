<template>
  <nav class="bg-secondary">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div
          v-show="$auth.loggedIn"
          class="absolute inset-y-0 left-0 flex items-center sm:hidden"
        >
          <!-- Mobile menu button-->
          <button
            type="button"
            class="inline-flex items-center justify-center p-2 rounded-md text-primary
              hover:text-primary-dark focus:outline-none focus:ring-2 focus:ring-inset
              focus:ring-primary"
            :aria-expanded="showMobileMenu"
            @click="showMobileMenu = !showMobileMenu"
          >
            <span class="sr-only">Open main menu</span>
            <X v-if="showMobileMenu" class="h-6 w-6" />
            <Menu v-else class="h-6 w-6" />
          </button>
        </div>

        <div
          class="flex items-center justify-center sm:items-stretch sm:justify-start"
          :class="{ 'flex-1': $auth.loggedIn, 'pl-2': !$auth.loggedIn }"
        >
          <div
            class="flex items-center"
            :class="{ 'flex-shrink-0': $auth.loggedIn }"
          >
            <NuxtLink to="/">
              <img
                class="h-8 w-auto"
                src="~/assets/images/logo-white.svg"
                alt="Drinqs"
              >
            </NuxtLink>
          </div>
          <div
            v-show="$auth.loggedIn"
            class="hidden sm:block sm:ml-6"
          >
            <div class="flex space-x-4">
              <NuxtLink
                v-for="link in navLinks"
                :key="link.text"
                v-slot="{ navigate, isActive }"
                :to="link.to"
              >
                <a
                  :class="navLinkCsscLasses(isActive)"
                  :href="link.to"
                  @click="navigate"
                >
                  {{ link.text }}
                </a>
              </NuxtLink>
            </div>
          </div>
        </div>

        <UserDropdown v-show="$auth.loggedIn" />
        <NuxtLink
          v-show="!$auth.loggedIn"
          to="/login"
          class="font-semibold no-underline hover:underline text-primary p-2"
        >
          Login
        </NuxtLink>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-show="showMobileMenu" class="z-10">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <NuxtLink
          v-for="link in navLinks"
          :key="`mobile-${link.text}`"
          v-slot="{ navigate, isActive }"
          :to="link.to"
        >
          <a
            :class="mobileNavLinkCssClasses(isActive)"
            :href="link.to"
            @click="navigate"
          >
            {{ link.text }}
          </a>
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'TheHeader',
  data() {
    return {
      showMobileMenu: false,

      navLinks: [
        {
          to: '/start',
          text: 'Start',
        },
        {
          to: '/drinq-it',
          text: 'Drinq it!',
        },
        {
          to: '/recommended-cocktails',
          text: 'Cocktails',
        },
        {
          to: '/search',
          text: 'Search',
        },
      ],
    };
  },
  watch: {
    $route() {
      this.showMobileMenu = false;
    },
  },
  methods: {
    navLinkCsscLasses(isActive) {
      return [
        'px-3', 'py-2', 'rounded-md', 'text-sm', 'font-medium', 'cusor-pointer',
        {
          'text-primary': isActive,
          'bg-secondary-lighter': isActive,
          'text-white': !isActive,
          'hover:text-primary': !isActive,
          'hover:bg-secondary-lighter': !isActive,
        },
      ];
    },
    mobileNavLinkCssClasses(isActive) {
      return [
        'block', 'px-3', 'py-2', 'rounded-md', 'text-base', 'font-medium', 'cusor-pointer',
        {
          'text-primary': isActive,
          'bg-secondary-lighter': isActive,
          'text-white': !isActive,
          'hover:text-primary': !isActive,
          'hover:bg-secondary-lighter': !isActive,
        },
      ];
    },
  },
};
</script>
