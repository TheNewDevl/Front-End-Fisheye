import { modalHelper } from "../utils/modalHelper.js";
import { Photographer, ValidatorReturn } from "../types";
import { validator } from "../utils/formValidators.js";

const CTA: HTMLElement = document.querySelector(".contact_button");
const form: HTMLElement = document.getElementById("contact_modal");

/**if no existing error, create a p element and append it to the closest form-data container*/
export const createError = (
  error: ValidatorReturn["error"],
  input: HTMLInputElement
) => {
  const closestLabel: HTMLLabelElement = input.closest("label");
  const hasError = closestLabel.querySelector(".input-error");
  if (!hasError) {
    const p = document.createElement("p");
    p.className = "input-error";
    p.textContent = error;
    closestLabel.appendChild(p);
    input.style.border = "2px solid red";
  }
};

/**if exists , remove the closest form-data error*/
export const removeError = (input: HTMLInputElement) => {
  const error = input.closest("label").querySelector(".input-error");
  if (error) {
    input.style.border = "";
    error.remove();
  }
};

/** return false if one or more input values are not valid and display errors */
const checkFormValidity = (inputs: NodeListOf<HTMLInputElement>) => {
  let formValidity = true;
  inputs.forEach((input) => {
    const validation = validator[input.id](input);
    if (!validation.validity) {
      createError(validation.error, input);
      formValidity = false;
    } else {
      removeError(input);
    }
  });
  return formValidity;
};

const handleSubmit = (e: MouseEvent, onModalClose) => {
  e.preventDefault();
  const inputs = document.querySelectorAll("input");

  if (checkFormValidity(inputs)) {
    let contact = {};

    //return values and reset
    inputs.forEach((i) => {
      contact = { ...contact, [i.id]: i.value };
      i.value = "";
    });
    console.log(contact);
    onModalClose();
  } else {
    console.log("Il y a une erreur dans le formulaire ");
  }
};

export const initForm = (photographerName: Photographer["name"]) => {
  const { onOpenModal, onModalClose } = modalHelper(form, CTA);

  form.querySelector("h1").innerHTML = `Contactez-moi ${photographerName}`;
  CTA.addEventListener("click", onOpenModal);

  form.addEventListener("submit", (e: MouseEvent) =>
    handleSubmit(e, onModalClose)
  );
};
