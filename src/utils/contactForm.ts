import { modalHelper } from "./modalHelper.js";

const CTA: HTMLElement = document.querySelector(".contact_button");
const form: HTMLElement = document.getElementById("contact_modal");

export const handleForm = () => {
  const { onOpenModal } = modalHelper(form, CTA);

  CTA.addEventListener("click", onOpenModal);
};
