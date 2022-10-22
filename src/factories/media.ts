import { Media } from "../types.js";
import { likesHelper } from "./likes.js";

export function MediaFactory(data: Media) {
  const { photographerId, title, image, video, likes, date, id } = data;
  const { savedLikes } = likesHelper(id, photographerId);

  const isLiked = savedLikes[photographerId]?.includes(id);
  const src = `assets/photographers/${photographerId}/${image ? image : video}`;

  const getImg = () => {
    const elementType = video ? "video" : "img";

    const media: HTMLVideoElement | HTMLImageElement =
      document.createElement(elementType);

    media.setAttribute("src", src);

    if (media.tagName === "VIDEO") {
      media.setAttribute("muted", "true");
      media.setAttribute("autoplay", "true");
      media.setAttribute("title", title);
    }

    media.setAttribute("alt", title);
    return media;
  };

  const handleLike = (e) => {
    const { savedLikes, addLike, removeLike } = likesHelper(id, photographerId);
    const isLiked = savedLikes[photographerId]?.includes(id);

    const numberContainer = e.currentTarget.closest(
      ".media-banner-likes"
    ).firstElementChild;
    if (isLiked) {
      removeLike();
      numberContainer.textContent = likes.toString();
    } else {
      addLike();
      numberContainer.textContent = (likes + 1).toString();
    }

    // when this event is caught, the total likes will be updated
    const likeEvent = new Event("like");
    dispatchEvent(likeEvent);
  };

  const getBottombanner = () => {
    const bannerDiv = document.createElement("div");
    bannerDiv.classList.add("media-banner");

    const titleP = document.createElement("p");
    titleP.textContent = title;

    const likesContainer = document.createElement("button");
    likesContainer.classList.add("media-banner-likes");
    likesContainer.setAttribute("aria-label", "Likes");

    const likesNumber = document.createElement("span");
    likesNumber.textContent = (isLiked ? likes + 1 : likes).toString();
    likesNumber.classList.add("likes-number");

    const img = document.createElement("img");
    img.setAttribute("alt", "likes");
    img.setAttribute("src", "../assets/icons/heart.svg");
    img.classList.add("likes-img");

    likesContainer.appendChild(likesNumber);
    likesContainer.appendChild(img);
    bannerDiv.appendChild(titleP);
    bannerDiv.appendChild(likesContainer);

    //LIKES MANAGEMENT
    likesContainer.addEventListener("click", handleLike);
    //////

    return bannerDiv;
  };

  function getMediaDOM() {
    const article = document.createElement("article");
    article.setAttribute("data-likes", `${likes}`);
    article.setAttribute("data-date", `${date}`);
    article.setAttribute("data-title", `${title}`);
    const media = getImg();

    const link = document.createElement("a");
    link.setAttribute("href", src);
    link.setAttribute("aria-label", `Ouvre l'image ${title}`);
    link.appendChild(media);

    const bottomBanner = getBottombanner();

    article.appendChild(link);
    article.appendChild(bottomBanner);
    return article;
  }

  return { getMediaDOM };
}
