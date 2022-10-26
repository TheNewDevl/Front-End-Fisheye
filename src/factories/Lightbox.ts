import { modalHelper } from "../utils/modalHelper.js";
import { ImgUrl, Media, MediaArray } from "../types.js";
import { MediaFactory } from "./media.js";

export function Lightbox(e, url: ImgUrl, medias: MediaArray) {
  //store the current displayed img url to be able to navigate
  let currentUrl: ImgUrl = url;

  /**return the index of currentUrl in medias array*/
  const getIndex = (images) => {
    return images.findIndex((i) =>
      i.image ? currentUrl.includes(i.image) : currentUrl.includes(i.video)
    );
  };

  /**accessibility => allows navigation and closing with the keyboard */
  const onKeyUp = (e: KeyboardEvent) => {
    e.key === "Escape" && close(e);
    e.key === "ArrowLeft" && prev(e);
    e.key === "ArrowRight" && next(e);
  };

  /** Add a fadeOut animation, remove lightbox from the DOM & clean event listener */
  const close = (e: MouseEvent | KeyboardEvent) => {
    e.preventDefault();
    document.removeEventListener("keyup", onKeyUp);
  };

  /** Load next img */
  const next = (e: MouseEvent | KeyboardEvent) => {
    e.preventDefault();
    const index = (getIndex(medias) + 1) % medias.length;
    loadMedia(medias[index]);
  };

  /** Load prev img */
  const prev = (e: MouseEvent | KeyboardEvent) => {
    e.preventDefault();
    const index = (getIndex(medias) + (medias.length - 1)) % medias.length;
    loadMedia(medias[index]);
  };

  /** handle loader and media display */
  const loadMedia = (media: Media) => {
    const isVideo = !!media.video;

    const container = element.querySelector(".lightbox-container");
    container.classList.remove("big");
    container.innerHTML = ""; //clean the container before setting new media

    //set media title
    const mediaTitle = document.createElement("h1");
    mediaTitle.setAttribute("id", "lightbox-title");
    mediaTitle.textContent = media.title;

    //get img or video element from MediaFactory
    const { getImg } = MediaFactory(media);
    const mediaDOM = getImg(true);
    isVideo && mediaDOM.setAttribute("controls", "");

    //create loader and append it to the container
    const loader = document.createElement("div");
    loader.classList.add("lightbox-loader");
    container.appendChild(loader);

    //when photo is loaded remove loader and display media
    mediaDOM[isVideo ? "oncanplay" : "onload"] = () => {
      container.removeChild(loader);
      container.appendChild(mediaDOM);
      container.appendChild(mediaTitle);
      currentUrl = media.image ? media.image : media.video;
    };

    //handle full screen image
    !isVideo &&
      mediaDOM.addEventListener("click", () => {
        mediaDOM.classList.toggle("big");
        container.classList.toggle("big");
      });
  };

  /** Create the lightbox, init event listeners and return lightbox dom */
  const buildDOM = (): HTMLElement => {
    const dom = document.createElement("main");

    const lightbox = document.createElement("div");
    lightbox.classList.add("lightbox");
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-label", "image closeup view");
    lightbox.setAttribute("aria-describedby", "lightbox-title");

    const prevBtn = document.createElement("button");
    prevBtn.classList.add("lightbox-prev");
    prevBtn.textContent = "Image précédente";
    const nextBtn = document.createElement("button");
    nextBtn.classList.add("lightbox-next");
    nextBtn.textContent = "Image suivante";
    const closeBtn = document.createElement("button");
    closeBtn.classList.add("lightbox-close", "close-btn");
    closeBtn.textContent = "Fermer la lightbox";

    const lightboxMediaContainer = document.createElement("div");
    lightboxMediaContainer.classList.add("lightbox-container");

    lightbox.append(prevBtn, lightboxMediaContainer, nextBtn, closeBtn);
    dom.appendChild(lightbox);

    lightbox.querySelector(".lightbox-close").addEventListener("click", close);
    lightbox.querySelector(".lightbox-next").addEventListener("click", next);
    lightbox.querySelector(".lightbox-prev").addEventListener("click", prev);

    return dom;
  };

  /** Save lightbox dom in a constant to reuse it */
  const element: HTMLElement = buildDOM();

  /** Append lightbox to the body document, and load first image */
  const init = () => {
    const { onOpenModal } = modalHelper(element, e.currentTarget, true);
    document.body.appendChild(element);
    onOpenModal();

    loadMedia(medias[getIndex(medias)]);
    document.addEventListener("keyup", onKeyUp);
  };

  return { init };
}

/** for each media links in the page, add a click event that will run the lightbox */
export const initLightbox = (medias: MediaArray) => {
  const links = [
    ...document.querySelectorAll(
      'a[href$=".jpg"], a[href$=".jpeg"], a[href$=".mp4"]'
    ),
  ];
  links.forEach((link: HTMLAnchorElement) =>
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLAnchorElement;
      const lightbox = Lightbox(e, target.getAttribute("href"), medias);
      lightbox.init();
    })
  );
};
