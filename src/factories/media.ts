import { Media, PhotographerDetail } from "../types.js";

export function MediaFactory(data: Media, photographerFactory) {
  const { photographerId, title, image, video, likes } = data;

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
    return bannerDiv;
  };

  const getInsert = () => {
    const insert = document.createElement("p");
    insert.classList.add("fixed-insert");
    const price = photographerFactory.getDetailSpan(PhotographerDetail.price);
    insert.appendChild(price);
    return insert;
  };

  function getMediaDOM() {
    document.body.appendChild(getInsert());
    const article = document.createElement("article");
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

  return { getMediaDOM, getInsert };
}
