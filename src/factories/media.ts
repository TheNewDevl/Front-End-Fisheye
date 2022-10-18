import { Media } from "../types";

export function MediaFactory(data: Media) {
  const { photographerId, title, image, video } = data;

  const src = `assets/photographers/${photographerId}/${image ? image : video}`;

  const getImg = () => {
    const elementType = video ? "video" : "img";

    const media: HTMLVideoElement | HTMLImageElement =
      document.createElement(elementType);

    media.setAttribute("src", src);
    media.setAttribute("role", "link");
    if (video) {
      media.setAttribute("autoplay", "");
    }
    media.setAttribute("alt", title);
    return media;
  };

  function getMediaDOM() {
    const article = document.createElement("article");
    const media = getImg();

    const link = document.createElement("a");
    link.setAttribute("href", src);
    link.appendChild(media);
    article.appendChild(link);
    return article;
  }

  return { getMediaDOM };
}
