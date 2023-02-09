<template>
  <div class="fav">
    <div class="fav__line" />

    <h1 class="fav__title">Избранное</h1>

    <div class="fav__holder">
      <the-loader v-if="state.is_loading" />
      <div v-else class="fav__list">
        <router-link
          v-for="photo in store.favorites"
          :key="`photo-${photo.id}`"
          class="fav__img-holder"
          :style="{ background: `url(${photo.urls.full})` }"
          :to="`/photo/${photo.id}`"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
import axios from "axios";
import TheLoader from "@/components/TheLoader.vue";
import { usePhotosStore } from "@/stores/photos";

export default {
  components: {
    TheLoader,
  },
  setup() {
    const store = usePhotosStore();

    const state = reactive({
      is_loading: true,
      //
      list: null,
    });

    const getList = () => {
      state.is_loading = true;

      axios
        .get("https://api.unsplash.com/photos", {
          headers: {
            Authorization: `Client-ID 84nIYHPg90SxtADfduvvrSqaJNlPQJDdnePt-O_U3A4`,
          },
          params: { query: state.query, per_page: 8 },
        })
        .then((response) => {
          state.list = response.data;
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          state.is_loading = false;
        });
    };

    const search = () => {
      getList();
    };

    onMounted(() => {
      getList();
    });

    return { state, getList, search, store };
  },
};
</script>

<style lang="scss" scoped>
.fav {
  &__title {
    font-family: "Roboto", sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 3rem;
    text-align: center;
    margin: 94px 0 101px;
  }

  &__holder {
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: 0 auto 160px;
  }

  &__line {
    width: 100%;
    height: 16px;
    background: #c4c4c4;
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
  }

  &__img-holder {
    width: 28vw;
    height: 28vw;
    overflow: hidden;
    margin-bottom: 23px;
    border-radius: 8px;
    background-size: cover !important;

    &:not(:nth-child(3n + 1)) {
      margin-left: 2.3vw;
    }

    &:hover {
      opacity: 0.7;
      cursor: pointer;
    }
  }
}
</style>
