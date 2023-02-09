<template>
  <div class="photo">
    <the-loader v-if="state.is_loading" class="photo__loader" />
    <div v-else class="photo__holder">
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
            <img alt="fav-ic" src="@/assets/icons/heart-black.svg" />
          </div>

          <div class="btn-download" @click="download">
            <img
              alt="fav-ic"
              src="@/assets/icons/download.svg"
              class="btn-download__img"
            />
            Download
          </div>
        </div>
      </div>

      <div class="photo__content">
        <img
          :alt="state.photo.alt_description"
          :src="state.photo.urls.full"
          class="photo__content__img"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { onMounted, reactive } from "vue";
import axios from "axios";
import TheLoader from "@/components/TheLoader.vue";
import { usePhotosStore } from "@/stores/photos";

export default {
  components: { TheLoader },
  setup() {
    const store = usePhotosStore();

    const route = useRoute();
    const { id } = route.params;

    const state = reactive({
      is_loading: true,
      //
      photo: null,
    });

    const getPhoto = () => {
      state.is_loading = true;

      axios
        .get(`https://api.unsplash.com/photos/${id}`, {
          headers: {
            Authorization: `Client-ID 84nIYHPg90SxtADfduvvrSqaJNlPQJDdnePt-O_U3A4`,
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
            Authorization: `Client-ID 84nIYHPg90SxtADfduvvrSqaJNlPQJDdnePt-O_U3A4`,
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

    onMounted(() => {
      getPhoto();
    });

    return { state, download, store };
  },
};
</script>

<style lang="scss" scoped>
.photo {
  width: 100%;
  margin-bottom: 20vw;

  &__loader {
    width: 90%;
    margin: 107px auto;
  }

  &__header {
    width: 90%;
    margin: 0 auto 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      display: flex;
      align-items: center;

      &__img {
        width: 55px;
        height: 55px;
        border: 1px solid #ffffff;
        border-radius: 8px;
      }

      &__content {
        font-family: Roboto, sans-serif;
        display: flex;
        flex-direction: column;
        color: #f2f2f2;
        font-weight: 400;
        font-size: 2rem;
        margin-left: 10px;

        .nick {
          font-size: 1rem;
          margin-top: 5px;
        }
      }
    }

    .right {
      display: flex;
      align-items: center;

      .btn-fav,
      .btn-download {
        cursor: pointer;

        &:hover {
          opacity: 0.7;
        }
      }

      .btn-fav {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        background: #fff;
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
        border-radius: 8px;
      }

      .btn-download {
        display: flex;
        align-items: center;
        height: 100%;
        margin-left: 20px;
        padding: 13px 23px;
        background: #fff200;
        border: 1px solid #fff200;
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
        border-radius: 8px;

        &__img {
          margin-right: 16px;
        }
      }
    }
  }

  &__content {
    display: flex;
    width: 90%;
    margin: 0 auto;
    box-shadow: 0 4px 50px rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    overflow: hidden;

    &__img {
      width: 100%;
    }
  }

  &__holder {
    background: url("@/assets/img/photo-bg.png");
    height: 774px;
    padding-top: 43px;
  }
}
</style>
