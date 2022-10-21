import { SortEnum } from "../types.js";
import { handlePageLoader } from "./loader.js";

export const Sort = (type: SortEnum) => {
  handlePageLoader(300);
  const container = document.querySelector(".medias-container");
  const mediasArray = [...container.querySelectorAll("article")];

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
  mediasArray.forEach((m) => container.appendChild(m));
};
