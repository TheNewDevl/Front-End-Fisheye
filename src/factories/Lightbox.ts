import { modalHelper } from "../utils/modalHelper.js";
import { Media, MediaArray } from "../types.js";
import { MediaFactory } from "./media.js";

type ImgUrl = string;

export function Lightbox(e, url: ImgUrl, medias: MediaArray) {
  //store the current displayed img url to be able to navigate
  let currentUrl: ImgUrl = url;

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
    container.innerHTML = ""; //clean the container before setting new media

    //get img or video element from MediaFactory
    const { getImg } = MediaFactory(media);
    const mediaDOM = getImg();
    isVideo && mediaDOM.setAttribute("controls", "");

    //prevent changing img when try to advance or rewind the video on keyboard
    isVideo && mediaDOM.addEventListener("keyup", (e) => e.stopPropagation());

    //create loader and append it to the container
    const loader = document.createElement("div");
    loader.classList.add("lightbox-loader");
    container.appendChild(loader);

    //when photo is loaded remove loader and display media
    mediaDOM[isVideo ? "oncanplay" : "onload"] = () => {
      container.removeChild(loader);
      container.appendChild(mediaDOM);
      currentUrl = media.image ? media.image : media.video;
    };
  };

  /** Create the lightbox, init event listeners and return lightbox dom */
  const buildDOM = (): HTMLDivElement => {
    const dom = document.createElement("div");
    dom.classList.add("lightbox");
    dom.setAttribute("role", "dialog");
    dom.setAttribute("aria-label", "image closeup view");
    dom.setAttribute("aria-describedby", "img-title");

    dom.innerHTML = `
         <button class="lightbox-close close-btn">Fermer</button>
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
    const { onOpenModal } = modalHelper(element, e.currentTarget, true);
    document.body.appendChild(element);
    onOpenModal();

    loadMedia(medias[getIndex(medias)]);
    document.addEventListener("keyup", onKeyUp);
  };

  return { init };
}
