<template>
  <div class="fav">
    <the-line />

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
import TheLoader from "@/components/TheLoader/TheLoader.vue";
import { usePhotosStore } from "@/stores/photos";
import TheLine from "@/components/TheLine/TheLine.vue";

export default {
  components: {
    TheLine,
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
        .get(`${store.base_url}`, {
          headers: {
            Authorization: `Client-ID ${store.access_key}`,
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

    onMounted(async () => {
      await getList();
    });

    return { state, getList, search, store };
  },
};
</script>

<style src="./FavView.scss" />
