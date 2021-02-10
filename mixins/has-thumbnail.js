export default {
  data() {
    return {
      thumbnailLoaded: !this.cocktail.thumbnailUrl,
      hasThumbnail: !!this.cocktail.thumbnailUrl,
    };
  },
  computed: {
    thumbnailEventListeners() {
      return {
        load: () => { this.thumbnailLoaded = true; },
        error: this.onImageLoadError,
      };
    },
  },
  methods: {
    onImageLoadError() {
      this.hasThumbnail = false;
      this.thumbnailLoaded = true;
    },
  },
};
