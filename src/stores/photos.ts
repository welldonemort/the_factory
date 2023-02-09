import { ref } from "vue";
import { defineStore } from "pinia";

const photos_ls = localStorage.getItem("favorites");

export const usePhotosStore = defineStore("photos", () => {
  const base_url = ref("https://api.unsplash.com/photos");
  const access_key = ref("84nIYHPg90SxtADfduvvrSqaJNlPQJDdnePt-O_U3A4");
  const favorites: any = ref(photos_ls ? JSON.parse(photos_ls) : []);

  const addToFavorites = (photo: any) => {
    const photo_exists = favorites.value.find(
      (p: { id: number }) => p.id === photo.id
    );

    if (photo_exists) {
      favorites.value.splice(favorites.value.indexOf(photo_exists), 1);
      localStorage.setItem("favorites", JSON.stringify([...favorites.value]));
    } else {
      let favorites_old = photos_ls ? JSON.parse(photos_ls) : [];

      localStorage.setItem(
        "favorites",
        JSON.stringify([...favorites_old, photo])
      );
      favorites.value.push(photo);
    }
  };

  return {
    access_key,
    base_url,
    favorites,
    //
    addToFavorites,
  };
});
