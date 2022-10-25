import { LikesHelperType, Media, Photographer, SavedLikes } from "../types.js";

export const likesHelper = (
  id: Media["id"] | null,
  photographerId: Photographer["id"]
): LikesHelperType => {
  //init likes
  const ls: SavedLikes | null = JSON.parse(localStorage.getItem("likes"));
  const savedLikes: SavedLikes = ls ? ls : {};

  /** Save current Likes object */
  const save = () => {
    localStorage.setItem("likes", JSON.stringify(savedLikes));
  };

  /** if savedLikes has photographer ID key, push media id, else create the key & ids array */
  const addLike = () => {
    if (savedLikes[photographerId]) {
      savedLikes[photographerId].push(id);
    } else {
      savedLikes[photographerId] = [id];
    }
    save();
  };

  /** filter the given media id from photographerId array */
  const removeLike = () => {
    const index = savedLikes[photographerId].findIndex((i) => i === id);
    savedLikes[photographerId].splice(index, 1);
    save();
  };

  /** return the number of ids by the given photographer id  */
  const getLikesByPhotographer = (): number => {
    return savedLikes[photographerId] ? savedLikes[photographerId].length : 0;
  };

  return {
    savedLikes,
    getLikesByPhotographer,
    addLike,
    removeLike,
  };
};
