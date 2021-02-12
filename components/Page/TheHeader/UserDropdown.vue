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
          type="button"
          class="bg-primary flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2
            focus:ring-offset-primary focus:ring-white"
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
          class="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg py-1 bg-white ring-1 ring-black min-w-48
            ring-opacity-5 z-50"
          :style="{ 'z-index': 100000 }"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu"
        >
          <div class="inline-block w-full px-4 py-2 pb-3 border-b border-gray-300 text-sm mb-1 whitespace-nowrap">
            <span>Signed in as</span>
            <span
              v-if="$auth.user"
              class="font-bold text-secondary"
            >
              {{ $auth.user.username }}
            </span>
          </div>

          <NuxtLink
            to="/profile"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
          >
            Your Profile
          </NuxtLink>

          <NuxtLink
            v-show="$auth.user && $auth.user.isOnboarded"
            to="/bookmarks"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
          >
            Bookmarks & Reviews
          </NuxtLink>

          <a
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            role="menuitem"
            @click="onLogout"
          >
            Logout
          </a>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import ClickOutside from 'vue-click-outside';

export default {
  name: 'UserDropdown',
  directives: {
    ClickOutside,
  },
  data() {
    return {
      showUserDropdown: false,
    };
  },
  watch: {
    $route() {
      this.showUserDropdown = false;
    },
  },
  methods: {
    ...mapActions('flash', ['setFlashMessage']),

    async onLogout() {
      await this.$auth.logout();

      this.$notification.open({
        type: 'success',
        message: 'Logged out successfully',
      });
    },

    hideUserDropdown() {
      this.showUserDropdown = false;
    },
  },
};
</script>
