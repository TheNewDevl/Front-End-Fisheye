//Mettre le code JavaScript lié à la page photographer.html
import { MediaArray, Photographer, SortEnum } from "../types.js";
import { photographerFactory } from "../factories/photographer.js";
import getData from "../utils/fetch.js";
import { MediaFactory } from "../factories/media.js";
import { initLightbox } from "../factories/Lightbox.js";
import { initForm } from "../factories/contactForm.js";
import { Sort } from "../utils/sortFns.js";
import { handlePageLoader } from "../utils/loader.js";
import { noMedias, noPhotographer } from "../utils/displayErrors.js";

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

async function init() {
  const urlParams = new URL(document.location.href).searchParams;
  const id = parseInt(urlParams.get("id"));

  // return error if there is no id
  if (!id) {
    handlePageLoader(0);
    return noPhotographer();
  }

  // Get photograoher Data
  const { photographer, medias } = await getDatas(id);

  //if there is a photographer display photographer data and init form
  if (!photographer) {
    handlePageLoader(0);
    return noPhotographer();
  } else {
    await displayPhotographerHeader(photographer, medias);
    initForm(photographer.name); //init form modal
  }

  //display medias only if back end return medias to display
  if (medias && medias.length > 0) {
    await displayMedias(medias);
    sortMedias(); //init sort event listener on select
    initLightbox(medias); //init lightbox listeners
    handlePageLoader();
  } else {
    handlePageLoader(0);
    return noMedias(
      "Ce photographe n'a pas encore de photos, contactez le ou retournez à l'accueil."
    );
  }
  handlePageLoader();
}

init();
