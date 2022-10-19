import { modalHelper } from "./modalHelper.js";

const CTA: HTMLElement = document.querySelector(".contact_button");
const form: HTMLElement = document.getElementById("contact_modal");

export const handleForm = (photographerName) => {
  const { onOpenModal } = modalHelper(form, CTA);

  form.querySelector("h1").innerHTML = `Contactez-moi ${photographerName}`;
  CTA.addEventListener("click", onOpenModal);
};
