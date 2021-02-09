<template>
  <div
    class="px-4 h-6 rounded-full text-xs font-semibold flex items-center w-fit"
    :class="colorCssClasses"
  >
    <span v-if="withDot" class="w-2 h-2 rounded-full mr-1" :class="dotColor" />
    <slot />
    <span v-if="removable" class="ml-1 cursor-pointer" :class="textColor" @click.stop="onRemove">
      <X class="w-3 h-3" />
    </span>
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
    removable: {
      type: Boolean,
      default: false,
    },
    withDot: {
      type: Boolean,
      default: false,
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
          'cursor-pointer',
          'transition-colors',
          'duration-200',
          'ease-in-out',
        ]);
      }

      return classes;
    },
  },
  methods: {
    onRemove() {
      this.$emit('remove');
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
