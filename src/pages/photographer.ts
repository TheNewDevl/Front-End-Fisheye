//Mettre le code JavaScript lié à la page photographer.html
import { MediaArray, Photographer, SortEnum } from "../types.js";
import { photographerFactory } from "../factories/photographer.js";
import getData from "../utils/fetch.js";
import { MediaFactory } from "../factories/media.js";
import { Lightbox } from "../factories/Lightbox.js";
import { initForm } from "../factories/contactForm.js";
import { Sort } from "../utils/sortFns.js";
import { handlePageLoader } from "../utils/loader.js";

type returnData = {
  photographer: Photographer;
  medias: MediaArray;
};

async function getDatas(id: Photographer["id"]): Promise<returnData> {
  const { photographers, media } = await getData();
  const photographer = photographers.find(
    (photographer) => photographer.id === id
  );
  const medias = media.filter((m) => m.photographerId === id);

  return { photographer, medias };
}

async function displayPhotographerHeader(photographer, medias) {
  const photographerHeader = document.querySelector(".photograph-header");
  const photographerModel = photographerFactory(photographer, medias);

  const photographerImg = photographerModel.getImg();
  const photographerInfos = photographerModel.getPhotographerHeaderDOM();

  photographerHeader.appendChild(photographerImg);
  photographerHeader.appendChild(photographerInfos);
}

async function displayMedias(medias: MediaArray) {
  const container = document.querySelector(".medias-container");
  medias.forEach((media) => {
    const { getMediaDOM } = MediaFactory(media);
    const image = getMediaDOM();
    container.appendChild(image);
  });
}

function sortMedias() {
  const select = document.querySelector("select");
  select.addEventListener("change", () => {
    if (SortEnum[select.value] !== undefined) Sort(SortEnum[select.value]);
  });
}

const initLightbox = (medias: MediaArray) => {
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

async function init() {
  const urlParams = new URL(document.location.href).searchParams;
  const id = parseInt(urlParams.get("id"));

  // Get photograoher Data
  const { photographer, medias } = await getDatas(id);

  //display datas
  await displayPhotographerHeader(photographer, medias);
  await displayMedias(medias);

  //init loader - will be removed when photos are loaded
  handlePageLoader();

  //init form modal
  initForm(photographer.name);

  //init sort event listener on select
  sortMedias();

  //init lightbox listeners
  initLightbox(medias);
}

init();
