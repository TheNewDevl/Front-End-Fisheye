/** Remove <main> content, display the given error message and a link to go back home  */
export const noPhotographer = (textContent?: string) => {
  const main = document.querySelector("main");
  main.setAttribute("aria-label", "erreur");
  main.innerHTML = `
    <h1 class="error-text">${
      textContent || "Oups, une erreur est survenue."
    }</h1>
    <a class="contact_button" href="./index.html">Retour à l'accueil</a>
  `;
};

/** Remove select filter, display the given error message and move the form button  */
export const noMedias = (textContent?: string) => {
  const filter = document.querySelector(".custom-select");
  filter.remove();

  const mediasContainer = document.querySelector(".medias-container");
  mediasContainer.setAttribute("aria-label", "erreur");
  mediasContainer.innerHTML = `
    <h1 class="error-text">${
      textContent || "Oups, une erreur est survenue."
    }</h1>
  `;
  mediasContainer.appendChild(document.querySelector(".contact_button"));
};
