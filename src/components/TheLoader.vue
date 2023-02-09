<template>
  <div class="loader">
    <img alt="photo" src="@/assets/icons/loading.svg" class="loader__img" />
  </div>
</template>

<style lang="scss" scoped>
.loader {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &__img {
    width: 30px;
    height: 30px;
  }
}
</style>
