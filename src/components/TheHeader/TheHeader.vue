<template>
  <div class="header-holder">
    <div :class="`header ${isMainPage ? '' : 'header-not-main'}`">
      <router-link to="/">
        <img alt="logo" src="@/assets/logo.svg" class="logo" />
      </router-link>

      <div class="buttons">
        <router-link to="/" v-if="!isMainPage" class="buttons__btn">
          <img
            alt="search-ic"
            src="@/assets/icons/search-white.svg"
            class="buttons__img"
          />
          <span class="buttons__span">Поиск</span>
        </router-link>

        <router-link to="/favorites" class="buttons__btn">
          <img
            alt="fav-ic"
            src="@/assets/icons/heart.svg"
            class="buttons__img"
          />
          <span class="buttons__span">Избранное</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { computed } from "vue";

export default {
  setup() {
    const route = useRoute();

    const isMainPage = computed(() => route.path === "/");

    return { isMainPage };
  },
};
</script>

<style src="./TheHeader.scss" />
