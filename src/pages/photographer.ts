//Mettre le code JavaScript lié à la page photographer.html
import { Photographer } from "../types.js";
import { photographerFactory } from "../factories/photographer.js";
import getData from "../utils/fetch.js";

async function getPhotographer(id): Promise<Photographer> {
  const { photographers } = await getData();
  return photographers.find((photographer) => photographer.id === id);
}

async function displayData(photographer) {
  const photographerHeader = document.querySelector(".photograph-header");
  const photographerModel = photographerFactory(photographer);

  const photographerImg = photographerModel.getImg();
  const photographerInfos = photographerModel.getPhotographerHeaderDOM();

  photographerHeader.appendChild(photographerImg);
  photographerHeader.appendChild(photographerInfos);
}

async function init() {
  const urlParams = new URL(document.location.href).searchParams;
  const id = parseInt(urlParams.get("id"));

  // Get photograoher Data
  const photographer = await getPhotographer(id);

  displayData(photographer);
}

init();
