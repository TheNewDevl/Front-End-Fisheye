import {photographerFactory} from "../factories/photographer.js";
import {DataType, PhotographersArray} from "../types";

async function getPhotographers(): Promise<PhotographersArray> {
  //fetch data from json
  try {
    const data: DataType = await fetch('../../data/photographers.json').then((res) => res.json())
    return data.photographers
  } catch (e) {
    console.log(`L'erreur suivante est survenue : ${e.message}`)
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
}

init();
    