import { Photographer, PhotographerDetail } from "../types.js";
import { likesHelper } from "./likes.js";

export function photographerFactory(data: Photographer, medias?) {
  const { name, portrait, id, country, tagline, price, city } = data;

  const picture = `assets/photographers/${portrait}`;
  const location = `${city}, ${country}`;
  const pricing = `${price}€/jour`;

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

  /** update text content using sum of photographer medias likes & localstorage*/
  const _totalLikes = (totalLikesDom: HTMLSpanElement) => {
    const { getLikesByPhotographer } = likesHelper(null, id);

    const baseLikes = medias.reduce((acc, current) => acc + current.likes, 0);
    const additionalLikes = getLikesByPhotographer();

    totalLikesDom.textContent = `${baseLikes + additionalLikes}`;
    return baseLikes + additionalLikes;
  };

  const getTotalLikes = () => {
    const likesP = document.createElement("p");
    likesP.classList.add("total-likes-container");

    const likesNumber = document.createElement("span");
    likesNumber.classList.add("total-likes-number");
    _totalLikes(likesNumber);

    //listen to like event to update total likes
    window.addEventListener("like", () => _totalLikes(likesNumber));

    //create likes img
    const heart = document.createElement("img");
    heart.setAttribute("src", "../assets/icons/blackHeart.svg");
    heart.setAttribute("alt", "likes");

    //append heart and text to the container
    likesP.appendChild(likesNumber);
    likesP.appendChild(heart);

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
