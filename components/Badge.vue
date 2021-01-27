<template>
  <div
    class="px-4 h-6 rounded-full text-xs font-semibold flex items-center cursor-pointer"
    :class="colorCssClasses"
  >
    <span v-if="dotColor" class="w-2 h-2 rounded-full mr-1" :class="dotColor" />
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    dotColor: {
      type: String,
      default: '',
    },
    textColor: {
      type: String,
      required: true,
    },
    backgroundColor: {
      type: String,
      required: true,
    },
    hoverColor: {
      type: String,
      default: '',
    },
  },
  computed: {
    colorCssClasses() {
      const classes = [
        this.backgroundColor,
        this.textColor,
      ];

      if (this.hoverColor) {
        classes.push(...[
          this.hoverColor,
          'hover:text-white',
        ]);
      }

      return classes;
    },
  },
};

/**
 * Example:
 *
 * <Badge
 *   dot-color="bg-teal-400"
 *   text-color="text-teal-700"
 *   background-color="bg-teal-100"
 *   hover-color="hover:bg-teal-500"
 * >
 *   Beta
 * </Badge>
 */
</script>
