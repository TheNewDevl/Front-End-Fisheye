type ImgUrl = string;

export function Lightbox(url: ImgUrl, images: ImgUrl[]) {
  //store the current displayed img url to be able to navigate
  let currentUrl: ImgUrl = url;

  /**accessibility => allows navigation and closing with the keyboard */
  const onKeyUp = (e: KeyboardEvent) => {
    e.key === "Escape" && close(e);
    e.key === "ArrowLeft" && prev(e);
    e.key === "ArrowRight" && next(e);
  };

  /** Add a fadeOut animation, remove lightbox from the DOM & clean event listener */
  const close = (e: MouseEvent | KeyboardEvent) => {
    e.preventDefault();
    element.classList.add("fadeOut");
    window.setTimeout(() => {
      element.remove();
    }, 500);

    document.removeEventListener("keyup", onKeyUp);
  };

  /** Load next img */
  const next = (e: MouseEvent | KeyboardEvent) => {
    e.preventDefault();
    const index =
      (images.findIndex((i) => i === currentUrl) + 1) % images.length;
    loadMedia(images[index]);
  };

  /** Load prev img */
  const prev = (e: MouseEvent | KeyboardEvent) => {
    e.preventDefault();
    const index =
      (images.findIndex((i) => i === currentUrl) + (images.length - 1)) %
      images.length;
    loadMedia(images[index]);
  };

  /** handle loader and media display */
  const loadMedia = (url: ImgUrl) => {
    const isVideo = /\.mp4$/.test(url);

    const container = element.querySelector(".lightbox-container");
    container.innerHTML = ""; //clean the container before setting new media

    //create video or image depend on url
    const media = isVideo ? document.createElement("video") : new Image();
    media.setAttribute("src", url);
    isVideo && media.setAttribute("autoplay", "");
    isVideo && media.setAttribute("controls", "");

    //create loader and append it to the container
    const loader = document.createElement("div");
    loader.classList.add("lightbox-loader");
    container.appendChild(loader);

    //when photo is loaded remove loader and display media
    media[isVideo ? "oncanplay" : "onload"] = () => {
      container.removeChild(loader);
      container.appendChild(media);
      currentUrl = url;
    };
  };

  /** Create the lightbox, init event listeners and return lightbox dom */
  const buildDOM = (): HTMLDivElement => {
    const dom = document.createElement("div");
    dom.classList.add("lightbox");
    dom.innerHTML = `
         <button class="lightbox-close">Fermer</button>
         <button class="lightbox-next">suivant</button>
         <button class="lightbox-prev">precedent</button>
         <div class="lightbox-container"></div>
    `;

    dom.querySelector(".lightbox-close").addEventListener("click", close);
    dom.querySelector(".lightbox-next").addEventListener("click", next);
    dom.querySelector(".lightbox-prev").addEventListener("click", prev);

    return dom;
  };

  /** Save lightbox dom in a constant to reuse it */
  const element: HTMLElement = buildDOM();

  /** Append lightbox to the body document, and load first image */
  const init = () => {
    document.body.appendChild(element);
    document.addEventListener("keyup", onKeyUp);
    loadMedia(currentUrl);
  };

  return { init };
}
