export type Photographer = {
  name: string;
  id: number;
  city: string;
  country: string;
  tagline: string;
  price: number;
  portrait: string;
};
export type PhotographersArray = Photographer[];

export type Media = {
  id: number;
  photographerId: Photographer["id"];
  title: string;
  image?: string;
  video?: string;
  likes: number;
  date: Date;
  price: number;
};
export type MediaArray = Media[];

export type DataType = {
  media: Media[];
  photographers: Photographer[];
};

export type PhotoGraphCard = {
  article: HTMLElement;
};

export enum PhotographerDetail {
  price = "Tarifs",
  tagline = "Devise",
  location = "Localication",
}

export type ValidatorReturn = {
  validity: boolean;
  error: string;
};

export type Validator = {
  firstName: (input: HTMLInputElement) => ValidatorReturn;
  lastName: (input: HTMLInputElement) => ValidatorReturn;
  email: (input: HTMLInputElement) => ValidatorReturn;
  message: (input: HTMLInputElement) => ValidatorReturn;
};

export enum SortEnum {
  popularity,
  date,
  title,
}

export interface SavedLikes {
  [Key: Media["photographerId"]]: Media["id"][];
}

export type LikesHelperType = {
  savedLikes: SavedLikes;
  getLikesByPhotographer: () => number;
  addLike: () => void;
  removeLike: () => void;
};

export interface Contact {
  firstName?: HTMLInputElement["value"];
  email?: HTMLInputElement["value"];
  lastName?: HTMLInputElement["value"];
  message?: HTMLInputElement["value"];
}

export interface ModalHelper {
  onModalClose: () => void;
  onOpenModal: () => void;
}

export type ImgUrl = string;

export interface PhotographerFactory {
  name: Photographer["name"];
  picture: ImgUrl;
  getUserCardDOM: () => HTMLElement;
  getImg: () => HTMLImageElement;
  getPhotographerHeaderDOM: () => HTMLElement;
}
