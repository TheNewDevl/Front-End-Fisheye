import { Photographer, PhotographerDetail } from "../types.js";

export function photographerFactory(data: Photographer) {
  const { name, portrait, id, country, tagline, price, city } = data;

  const picture = `assets/photographers/${portrait}`;
  const location = `${city}, ${country}`;
  const pricing = `${price}€/jour`;

  // Return an img element that contains src and alt attributes
  const getImg = (): HTMLImageElement => {
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `Photo de ${name}`);
    return img;
  };

  // Return h2 that contains the photographer name
  const getH2 = (): HTMLHeadingElement => {
    const h2 = document.createElement("h2");
    h2.textContent = name;
    return h2;
  };

  // Return a span that text content & aria-label will depend on param
  const getDetailSpan = (type: PhotographerDetail): HTMLSpanElement => {
    const span = document.createElement("span");
    span.textContent =
      type === PhotographerDetail.price
        ? pricing
        : PhotographerDetail.location
        ? location
        : tagline;
    span.setAttribute("aria-label", `${type} de ${name}`);
    return span;
  };

  // Return a p element that contains price, tagline & location spans
  const getDetailsP = (): HTMLParagraphElement => {
    const p = document.createElement("p");
    const spans = [
      getDetailSpan(PhotographerDetail.location),
      getDetailSpan(PhotographerDetail.tagline),
      getDetailSpan(PhotographerDetail.price),
    ];
    spans.forEach((span) => p.appendChild(span));
    return p;
  };

  // Return h2 and img wrapped by a link to photographer page
  const getLink = (): HTMLAnchorElement => {
    const link = document.createElement("a");
    link.setAttribute("href", `./photographer.html?id=${id}`);
    link.setAttribute("aria-label", `${name} Page`);

    const children: HTMLElement[] = [getImg(), getH2()];
    children.forEach((child) => link.appendChild(child));

    return link;
  };

  // Return full Photographer DOM card
  function getUserCardDOM() {
    const article = document.createElement("article");

    const link = getLink();
    const p = getDetailsP();

    article.appendChild(link);
    article.appendChild(p);
    return article;
  }

  return { name, picture, getUserCardDOM, getH2, getImg };
}
