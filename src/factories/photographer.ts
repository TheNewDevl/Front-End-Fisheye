import {Photographer} from "../types";

export function photographerFactory(data: Photographer) {
  const {name, portrait, id, country, tagline, price, city} = data;

  const picture = `assets/photographers/${portrait}`;
  const location = `${city}, ${country}`
  const pricing = `${price}€/jour`

  function getUserCardDOM() {
    const article = document.createElement('article');
    const img = document.createElement('img');
    img.setAttribute("src", picture)
    const h2 = document.createElement('h2');
    h2.textContent = name;

    const p = document.createElement('p')

    const locationSpan = document.createElement('span')
    locationSpan.textContent = location
    const taglineSpan = document.createElement('span')
    taglineSpan.textContent = tagline
    const pricingSpan = document.createElement('span')
    pricingSpan.textContent = pricing
    p.appendChild(locationSpan)
    p.appendChild(taglineSpan)
    p.appendChild(pricingSpan)

    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(p);
    return (article);
  }

  return {name, picture, getUserCardDOM}
}