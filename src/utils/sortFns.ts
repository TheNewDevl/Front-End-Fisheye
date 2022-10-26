import { SortEnum } from "../types.js";
import { handlePageLoader } from "./loader.js";

/** Sort medias by date, popularity, or title and append sorted medias to the container */
export const Sort = (type: SortEnum) => {
  handlePageLoader(300); // display loader during 300ms

  const container: HTMLDivElement = document.querySelector(".medias-container");
  const mediasArray: HTMLElement[] = [...container.querySelectorAll("article")];

  if (type === SortEnum.popularity) {
    mediasArray.sort((a, b) => +b.dataset.likes - +a.dataset.likes);
  } else if (type === SortEnum.date) {
    mediasArray.sort((a, b) => {
      return (
        new Date(b.dataset.date).getTime() - new Date(a.dataset.date).getTime()
      );
    });
  } else if (type === SortEnum.title) {
    mediasArray.sort((a, b) => a.dataset.title.localeCompare(b.dataset.title));
  }

  //display sorted medias
  mediasArray.forEach((m) => container.appendChild(m));
};
