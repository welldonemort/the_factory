<template>
  <div class="header-holder">
    <div class="header">
      <router-link to="/">
        <img alt="photo" src="@/assets/logo.svg" class="logo" />
      </router-link>

      <div class="buttons">
        <router-link to="/" v-if="!isMainPage" class="buttons__btn">
          <img
            alt="search-ic"
            src="@/assets/icons/search-white.svg"
            class="buttons__img"
          />
          Поиск
        </router-link>

        <router-link to="/favorites" class="buttons__btn">
          <img
            alt="fav-ic"
            src="@/assets/icons/heart.svg"
            class="buttons__img"
          />
          Избранное
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

<style lang="scss" scoped>
.header-holder {
  width: 100%;
  background: #000;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    margin: 37px auto;

    .logo {
      width: 185px;
      height: auto;
    }

    .buttons {
      display: flex;
      align-items: center;
      color: #fff;

      &:not(:first-child) {
        margin-left: 38px;
      }

      &__img {
        width: 23px;
        height: auto;
        margin-right: 10px;
      }

      &__btn {
        display: flex;
        align-items: center;
        color: #fff;

        &:hover {
          cursor: pointer;
          opacity: 0.7;
        }

        &:not(:first-child) {
          margin-left: 38px;
        }
      }
    }
  }
}
</style>
