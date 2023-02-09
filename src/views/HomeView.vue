<template>
  <div class="home">
    <div class="home__search">
      <div class="input-holder">
        <input
          type="text"
          placeholder="Поиск"
          class="home__search__input"
          v-model="state.query"
        />

        <img
          alt="search-ic"
          src="@/assets/icons/search.svg"
          class="home__search__ic"
          @click="search"
        />
      </div>
    </div>

    <div class="home__line" />

    <div class="home__holder">
      <the-loader v-if="state.is_loading" />
      <div v-else class="home__list">
        <router-link
          v-for="photo in state.list"
          :key="`photo-${photo.id}`"
          class="home__img-holder"
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

    onMounted(() => {
      getList();
    });

    return { state, getList, search };
  },
};
</script>

<style lang="scss" scoped>
.home {
  &__holder {
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: 107px auto;
  }

  &__search {
    display: flex;
    justify-content: center;
    background: url("@/assets/img/night.png");
    background-size: cover;
    position: relative;

    &::before {
      background-color: rgba(0, 0, 0, 0.5);
      content: "";
      display: block;
      height: 100%;
      position: absolute;
      width: 100%;
    }

    .input-holder {
      display: flex;
      position: relative;
      width: 45%;
      margin: 91px 0;
    }

    &__ic {
      position: absolute;
      right: 23px;
      top: 32%;
      width: 23px;
      height: 23px;

      &:hover {
        cursor: pointer;
        opacity: 0.7;
      }
    }

    &__input {
      width: 100%;
      height: 70px;
      padding: 21px 39px;
      outline: none;
    }

    ::placeholder,
    &__input {
      opacity: 1;
      font-family: Roboto, sans-serif;
      font-style: normal;
      font-weight: 300;
      font-size: 1.4rem;
      color: #000000;
    }
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
