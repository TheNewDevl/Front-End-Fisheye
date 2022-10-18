//Mettre le code JavaScript lié à la page photographer.html
import { MediaArray, Photographer } from "../types.js";
import { photographerFactory } from "../factories/photographer.js";
import getData from "../utils/fetch.js";
import { MediaFactory } from "../factories/media.js";
import { Lightbox } from "../factories/Lightbox.js";

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

async function displayPhotographerHeader(photographer) {
  const photographerHeader = document.querySelector(".photograph-header");
  const photographerModel = photographerFactory(photographer);

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

async function init() {
  const urlParams = new URL(document.location.href).searchParams;
  const id = parseInt(urlParams.get("id"));

  // Get photograoher Data
  const { photographer, medias } = await getDatas(id);

  await displayPhotographerHeader(photographer);
  await displayMedias(medias);

  const links = [
    ...document.querySelectorAll(
      'a[href$=".jpg"], a[href$=".jpeg"], a[href$=".mp4"]'
    ),
  ];

  const images = links.map((link) => link.getAttribute("href"));

  links.forEach((link: HTMLAnchorElement) =>
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLAnchorElement;
      const lightbox = Lightbox(target.getAttribute("href"), images);
      lightbox.init();
    })
  );
}

init();
