<template>
  <div
    v-click-outside="hideUserDropdown"
    class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
  >
    <!-- Profile dropdown -->
    <div class="ml-3 relative">
      <div>
        <button
          id="user-menu"
          class="bg-dark-purple flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2
            focus:ring-offset-dark-purple focus:ring-white"
          aria-haspopup="true"
          @click="showUserDropdown = !showUserDropdown"
        >
          <span class="sr-only">Open user menu</span>
          <UserCircle class="h-8 w-8 rounded-full text-white" />
        </button>
      </div>

      <transition
        enter-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        enter-active-class="transition ease-out duration-100"
        leave-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
        leave-active-class="transition ease-in duration-75"
      >
        <div
          v-show="showUserDropdown"
          class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black
            ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu"
        >
          <NuxtLink
            v-for="link in userLinks"
            :key="`user-${link.text}`"
            :to="link.to"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
          >
            {{ link.text }}
          </NuxtLink>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';

export default {
  name: 'UserDropdown',
  directives: {
    ClickOutside,
  },
  data() {
    return {
      showUserDropdown: false,

      userLinks: [
        {
          to: '/profile',
          text: 'Your Profile',
        },
        {
          to: '/settings',
          text: 'Settings',
        },
        {
          to: '/logout',
          text: 'Logout',
        },
      ],
    };
  },
  methods: {
    hideUserDropdown() {
      this.showUserDropdown = false;
    },
  },
};
</script>
