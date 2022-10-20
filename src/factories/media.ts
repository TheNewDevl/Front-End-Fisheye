import { Media, PhotographerDetail, SortEnum } from "../types.js";

export function MediaFactory(data: Media) {
  const { photographerId, title, image, video, likes, date } = data;

  const src = `assets/photographers/${photographerId}/${image ? image : video}`;

  const getImg = () => {
    const elementType = video ? "video" : "img";

    const media: HTMLVideoElement | HTMLImageElement =
      document.createElement(elementType);

    media.setAttribute("src", src);
    media.setAttribute("role", "link");

    if (media.tagName === "VIDEO") {
      media.setAttribute("muted", "true");
      media.setAttribute("autoplay", "true");
    }

    media.setAttribute("alt", title);
    return media;
  };

  const handleLike = (e) => {
    const savedLikes = localStorage.getItem("likes");
    const number = e.currentTarget.closest(
      ".media-banner-likes"
    ).firstElementChild;
    const newLikes = likes + 1;
    number.textContent = newLikes.toString();
  };

  const getBottombanner = () => {
    const bannerDiv = document.createElement("div");
    bannerDiv.classList.add("media-banner");

    const titleP = document.createElement("p");
    titleP.textContent = title;

    const likesContainer = document.createElement("div");
    likesContainer.classList.add("media-banner-likes");
    const likesNumber = document.createElement("p");
    likesNumber.textContent = likes.toString();
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
    img.addEventListener("click", handleLike);

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
