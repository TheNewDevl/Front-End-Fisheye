import { Photographer, PhotographerDetails } from "../types.js";

export function photographerFactory(data: Photographer) {
  const { name, portrait, id, country, tagline, price, city } = data;

  const picture = `assets/photographers/${portrait}`;
  const location = `${city}, ${country}`;
  const pricing = `${price}€/jour`;

  const getImg = (): HTMLImageElement => {
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `Photo de ${name}`);
    return img;
  };

  const getH2 = (): HTMLHeadingElement => {
    const h2 = document.createElement("h2");
    h2.textContent = name;
    return h2;
  };

  const getDetailSpan = (type: PhotographerDetails): HTMLSpanElement => {
    const span = document.createElement("span");
    span.textContent =
      type === PhotographerDetails.price
        ? pricing
        : PhotographerDetails.location
        ? location
        : tagline;
    span.setAttribute("aria-label", `${type} de ${name}`);
    return span;
  };

  const getDetailsP = (): HTMLParagraphElement => {
    const p = document.createElement("p");
    const spans = [
      getDetailSpan(PhotographerDetails.location),
      getDetailSpan(PhotographerDetails.tagline),
      getDetailSpan(PhotographerDetails.price),
    ];
    spans.forEach((span) => p.appendChild(span));
    return p;
  };

  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = getImg();
    const h2 = getH2();
    const p = getDetailsP();

    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(p);
    return article;
  }

  return { name, picture, getUserCardDOM, getH2, getImg };
}
