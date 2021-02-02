<template>
  <div>
    <Particles />
    <div
      class="max-w-lg mx-auto w-full flex items-center justify-center"
      :style="{ 'min-height': 'calc(100vh - 10rem)' }"
    >
      <h1 class="text-secondary font-bold text-4xl min-w-full text-center">
        Welcome to drinqs!
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
};
</script>
