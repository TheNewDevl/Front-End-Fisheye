import { Media } from "../types.js";
import { likesHelper } from "./likes.js";

const likedColor = "#D3573C";
const unlikedColor = "#911C1C";
const heartSvg = (isLiked: boolean) => {
  return `<svg role="img" aria-label="likes" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.5 18.35L8.23125 17.03C3.725 12.36 0.75 9.28 0.75 5.5C0.75 2.42 2.8675 0 5.5625 0C7.085 0 8.54625 0.81 9.5 2.09C10.4538 0.81 11.915 0 13.4375 0C16.1325 0 18.25 2.42 18.25 5.5C18.25 9.28 15.275 12.36 10.7687 17.04L9.5 18.35Z"
      fill="${isLiked ? likedColor : unlikedColor}"/>
  </svg>`;
};

/** Will update the likes number and icon, depending on like param */
const setLikesColor = (
  target: HTMLButtonElement,
  number,
  like: "like" | "unlike"
): void => {
  const svgPath = target.querySelector("path");
  svgPath.setAttribute("fill", like === "like" ? likedColor : unlikedColor);
  number.style.color = like === "like" ? likedColor : unlikedColor;
};

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
      media.setAttribute("controls", "");
      media.setAttribute("title", title);
    }

    media.setAttribute("alt", title);
    media.setAttribute("tabindex", "0");

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
      setLikesColor(e.currentTarget, numberContainer, "unlike");
    } else {
      addLike();
      numberContainer.textContent = (likes + 1).toString();
      setLikesColor(e.currentTarget, numberContainer, "like");
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

    const likesBtn = document.createElement("button");
    likesBtn.classList.add("media-banner-likes");
    likesBtn.setAttribute("aria-label", "Likes");

    const likesNumber = document.createElement("span");
    likesNumber.textContent = (isLiked ? likes + 1 : likes).toString();
    likesNumber.classList.add("likes-number");
    likesNumber.style.color = isLiked ? likedColor : unlikedColor;

    likesBtn.appendChild(likesNumber);
    likesBtn.insertAdjacentHTML("beforeend", heartSvg(isLiked));

    bannerDiv.appendChild(titleP);
    bannerDiv.appendChild(likesBtn);

    //init click event handle likes
    likesBtn.addEventListener("click", handleLike);

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

  return { getMediaDOM, getImg };
}
