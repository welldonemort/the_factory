<template>
  <div class="photo">
    <the-loader v-if="state.is_loading" class="photo__loader" />
    <div v-else class="photo__holder">
      <div v-if="state.is_full" class="photo__full-holder">
        <div class="photo__full">
          <img :src="state.photo.urls.full" alt="photo-full" />
          <img
            src="@/assets/icons/close.svg"
            alt="close-ic"
            class="close"
            @click="togglePhoto"
          />
        </div>
      </div>

      <div class="photo__header">
        <div class="left">
          <img
            :src="state.photo?.user?.profile_image?.medium"
            alt="artist"
            class="left__img"
          />

          <div class="left__content">
            <span class="name">{{ state.photo?.user?.name }}</span>
            <span class="nick">@{{ state.photo?.user?.username }}</span>
          </div>
        </div>

        <div class="right">
          <div class="btn-fav" @click="store.addToFavorites(state.photo)">
            <img
              v-if="isFavorite"
              alt="fav-ic"
              src="@/assets/icons/heart-filled.svg"
              class="btn-fav__img"
            />
            <img
              v-else
              alt="fav-ic"
              src="@/assets/icons/heart-black.svg"
              class="btn-fav__img"
            />
          </div>

          <div class="btn-download" @click="download">
            <img
              alt="fav-ic"
              src="@/assets/icons/download.svg"
              class="btn-download__img"
            />
            <span>Download</span>
          </div>
        </div>
      </div>

      <div class="photo__content">
        <img
          :alt="state.photo.alt_description"
          :src="state.photo.urls.full"
          class="photo__content__img"
        />

        <img
          src="@/assets/icons/scale.svg"
          alt="scale-ic"
          class="photo__content__ic"
          @click="togglePhoto"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { computed, onMounted, reactive } from "vue";
import axios from "axios";
import TheLoader from "@/components/TheLoader/TheLoader.vue";
import { usePhotosStore } from "@/stores/photos";

export default {
  components: { TheLoader },
  setup() {
    const store = usePhotosStore();

    const route = useRoute();
    const { id } = route.params;

    const state = reactive({
      is_loading: true,
      is_full: false,
      //
      photo: null,
    });

    const getPhoto = () => {
      state.is_loading = true;

      axios
        .get(`${store.base_url}/${id}`, {
          headers: {
            Authorization: `Client-ID ${store.access_key}`,
          },
        })
        .then((response) => {
          state.photo = response.data;
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          state.is_loading = false;
        });
    };

    const download = () => {
      axios
        .get(state.photo.links.download_location, {
          headers: {
            Authorization: `Client-ID ${store.access_key}`,
          },
        })
        .then((res) => {
          fetch(res.data.url)
            .then((resp) => resp.blob())
            .then((blob) => {
              const imageUrl = window.URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = imageUrl;
              link.setAttribute("download", "image.png");
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            });
        });
    };

    onMounted(async () => {
      await getPhoto();
    });

    const isFavorite = computed(() => {
      const fav_exists = store.favorites.find((f) => f.id === state.photo.id);
      return !!fav_exists;
    });

    const togglePhoto = () => {
      state.is_full = !state.is_full;
    };

    return { state, download, store, isFavorite, togglePhoto };
  },
};
</script>

<style src="./PhotoView.scss" />
