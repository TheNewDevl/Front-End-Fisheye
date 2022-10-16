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
  image: string;
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

export enum PhotographerDetails {
  price = "Tarifs",
  tagline = "Device",
  location = "Localication",
}
