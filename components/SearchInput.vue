<template>
  <BaseInput
    id="search-input"
    v-model="searchTerm"
    placeholder="Tequila"
    icon="search"
    :clickable-icon="true"
    autocomplete="off"
    @keyup.enter="debouncedSearch()"
    @icon-click="debouncedSearch()"
  />
</template>

<script>
import { get } from 'vuex-pathify';
import { mapActions } from 'vuex';
import { debounce } from 'lodash';

export default {
  computed: {
    searchTerm: {
      get: get('search/searchTerm'),
      set(term) {
        this.setSearchTerm(term);
        this.debouncedSearch();
      },
    },
    debouncedSearch() {
      return debounce(this.performSearch, 1000);
    },
  },
  methods: {
    ...mapActions('search', ['performSearch', 'setSearchTerm']),
  },
};
</script>
