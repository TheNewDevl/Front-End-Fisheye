import { Media, Photographer } from "../types.js";

export const likesHelper = (
  id: Media["id"],
  photographerId: Photographer["id"]
) => {
  const ls = JSON.parse(localStorage.getItem("likes"));
  const savedLikes = ls ? ls : {};

  const save = () => {
    localStorage.setItem("likes", JSON.stringify(savedLikes));
  };

  const addLike = () => {
    if (savedLikes[photographerId]) {
      savedLikes[photographerId].push(id);
    } else {
      savedLikes[photographerId] = [id];
    }
    save();
  };

  const removeLike = () => {
    savedLikes[photographerId] = savedLikes[photographerId].filter(
      (i) => i !== id
    );
    save();
  };

  const getLikesByPhotographer = () => {
    return savedLikes[photographerId]
      ? savedLikes[photographerId].length
      : null;
  };

  return {
    savedLikes,
    getLikesByPhotographer,
    addLike,
    removeLike,
  };
};
