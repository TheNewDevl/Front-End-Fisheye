import { Media } from "../types";

export function MediaFactory(data: Media) {
  const { photographerId, title, image, video } = data;

  const src = `assets/photographers/${photographerId}/${image ? image : video}`;

  const getImg = () => {
    const elementType = video ? "video" : "img";
    const media = document.createElement(elementType);
    media.setAttribute("src", src);
    media.setAttribute("role", "link");
    media.setAttribute("alt", title);
    return media;
  };

  function getMediaDOM() {
    const article = document.createElement("article");
    const media = getImg();

    article.appendChild(media);
    return article;
  }

  return { getMediaDOM };
}
