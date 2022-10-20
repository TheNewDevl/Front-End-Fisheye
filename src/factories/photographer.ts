import { Photographer, PhotographerDetail } from "../types.js";

export function photographerFactory(data: Photographer, medias?) {
  const { name, portrait, id, country, tagline, price, city } = data;

  const picture = `assets/photographers/${portrait}`;
  const location = `${city}, ${country}`;
  const pricing = `${price}€/jour`;

  const totalLikes: number =
    medias && medias.reduce((acc, current) => acc + current.likes, 0);

  // Return an img element that contains src and alt attributes
  const getImg = (): HTMLImageElement => {
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `Photo de ${name}`);
    img.classList.add("photographer-img");
    return img;
  };

  // Return h1 or h2 ( depend on page pathname ) that contains the photographer name
  const getHeading = (): HTMLHeadingElement => {
    const path = window.location.pathname;
    const headingLevel = /photographer.html/.test(path) ? "h1" : "h2";

    const h: HTMLHeadingElement = document.createElement(headingLevel);
    h.classList.add("photographer-name");
    h.textContent = name;
    return h;
  };

  // Return a span that text content & aria-label will depend on param
  const getDetailSpan = (type: PhotographerDetail): HTMLSpanElement => {
    const span = document.createElement("span");
    if (type === PhotographerDetail.price) {
      span.textContent = pricing;
      span.classList.add("photographer-price");
    }
    if (type === PhotographerDetail.location) {
      span.textContent = location;
      span.classList.add("photographer-location");
    }
    if (type === PhotographerDetail.tagline) {
      span.textContent = tagline;
      span.classList.add("photographer-tagline");
    }
    span.setAttribute("role", "note");
    span.setAttribute("aria-label", `${type} de ${name}`);
    return span;
  };

  // Return a p element that contains price, tagline & location spans
  const getDetailsP = (): HTMLParagraphElement => {
    const p = document.createElement("p");
    p.classList.add("photographer-details");

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

    const children: HTMLElement[] = [getImg(), getHeading()];
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

  const getTotalLikes = () => {
    const likesP = document.createElement("p");
    likesP.innerHTML = `${totalLikes} <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.125 18.35L7.85625 17.03C3.35 12.36 0.375 9.28 0.375 5.5C0.375 2.42 2.4925 0 5.1875 0C6.71 0 8.17125 0.81 9.125 2.09C10.0787 0.81 11.54 0 13.0625 0C15.7575 0 17.875 2.42 17.875 5.5C17.875 9.28 14.9 12.36 10.3938 17.04L9.125 18.35Z" fill="black"/>
</svg>
    `;
    return likesP;
  };

  const getInsert = () => {
    const insert = document.createElement("p");
    insert.classList.add("fixed-insert");

    const price = getDetailSpan(PhotographerDetail.price);
    price.classList.remove("photographer-price");

    const likes = getTotalLikes();
    insert.appendChild(likes);
    insert.appendChild(price);
    return insert;
  };

  const getPhotographerHeaderDOM = () => {
    const container = document.createElement("div");
    const h1 = getHeading();
    const p = getDetailsP();

    container.appendChild(h1);
    container.appendChild(p);
    container.appendChild(getInsert());
    return container;
  };

  return {
    name,
    picture,
    getUserCardDOM,
    getHeading,
    getImg,
    getPhotographerHeaderDOM,
    getDetailSpan,
  };
}
