import { PhotographersArray } from "../types.js";
import getData from "../utils/fetch.js";
import { photographerFactory } from "../factories/photographer.js";
import { handlePageLoader } from "../utils/loader.js";

async function getPhotographers(): Promise<PhotographersArray> {
  //fetch data from json
  try {
    const { photographers } = await getData();
    return photographers;
  } catch (e) {
    console.log(`L'erreur suivante est survenue : ${e.message}`);
  }
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const photographers = await getPhotographers();
  displayData(photographers);

  //init loader - will be removed when photos are loaded
  handlePageLoader();
}

init();

export default getPhotographers;
