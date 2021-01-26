<template>
  <div class="container">
    Hello World!
  </div>
</template>

<script>
export default {
  auth: false,
  middleware({ redirect }) {
    redirect('/start');
  },
};
</script>
