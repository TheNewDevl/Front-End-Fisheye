import { Validator, ValidatorReturn } from "../types.js";

export const validator: Validator = {
  /** Checks if the input value contains 2 to 30 alphabetic characters  */
  firstName(input: HTMLInputElement): ValidatorReturn {
    const validity = /^([a-zA-Z'éèàçêï-][\s]{0,1}){2,30}$/.test(input.value);
    const error = "Veuillez entrer 2 lettres ou plus pour le champ du prénom.";
    return { validity, error };
  },

  /** Checks if the input value contains 2 to 30 alphabetic characters  */
  lastName(input: HTMLInputElement): ValidatorReturn {
    return this.firstName(input);
  },

  /** Checks if the input value is a valid email address  */
  email(input: HTMLInputElement): ValidatorReturn {
    const error = "Veuillez saisir une adresse email valide.";
    const validity =
      /^([a-z0-9]+(?:[._-][a-z0-9]+)*)@([a-z0-9]+(?:[.-][a-z0-9]+)*\.[a-z]{2,})$/i.test(
        input.value
      );
    return { validity, error };
  },

  /** Checks if the input value contains 2 to 500 characters  */
  message(input: HTMLInputElement): ValidatorReturn {
    const validity = input.value.length > 1 && input.value.length <= 500;
    const error = "Veuillez remplir ce champ";
    return { validity, error };
  },
};
