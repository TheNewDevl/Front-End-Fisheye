/** Append a loader to the body and remove it when all images are loaded */
export const handlePageLoader = (delay = 5000) => {
  let numberOfImages = 0;
  const images: NodeListOf<HTMLImageElement> =
    document.querySelectorAll("main img");

  const loaderContainer: HTMLDivElement = document.createElement("div");
  loaderContainer.classList.add("loader");
  document.body.appendChild(loaderContainer);

  /** increment nomberOfImages and remove loader if numberOfImages loaded equal images*/
  const handleRemoveLoader = () => {
    numberOfImages++;
    if (numberOfImages === images.length) {
      loaderContainer.remove();
    }
  };

  images.forEach((img) => img.addEventListener("load", handleRemoveLoader));

  //in any case remove the loader after the given time
  setTimeout(() => {
    images.forEach((img) =>
      img.removeEventListener("load", handleRemoveLoader)
    );
    loaderContainer.remove();
    numberOfImages = 0;
  }, delay);
};
