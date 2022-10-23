/** Append a loader to the body and remove it when all images are loaded */
import { modalHelper } from "./modalHelper.js";

export const handlePageLoader = (delay = 5000) => {
  const loaderContainer: HTMLDivElement = document.querySelector(".loader");
  const { onModalClose, onOpenModal } = modalHelper(loaderContainer, null);
  let loadedImages = 0;

  //display loading modal
  onOpenModal();

  //in any case remove the loader after the given time
  setTimeout(() => {
    if (loaderContainer.style.display !== "none") {
      onModalClose();
    }
  }, delay);

  //images in the page
  const images: NodeListOf<HTMLImageElement> =
    document.querySelectorAll("main img");

  //run this code only if there are images to load
  if (images.length > 0) {
    /** increment loadedImages and remove loader if numberOfImages loaded equal images*/
    const handleRemoveLoader = () => {
      loadedImages++;
      if (loadedImages === images.length) {
        onModalClose();
      }
    };

    //for each image attach load event listener
    images.forEach((img) => {
      img.addEventListener("load", handleRemoveLoader);
      setTimeout(
        () => img.removeEventListener("load", handleRemoveLoader),
        delay
      );
    });
  }
};
