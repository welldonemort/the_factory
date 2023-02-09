<template>
  <div class="container">
    <the-header />

    <RouterView />
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import TheHeader from "@/components/TheHeader/TheHeader.vue";

export default {
  components: {
    TheHeader,
    RouterView,
  },
};
</script>
