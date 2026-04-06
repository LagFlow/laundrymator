export enum ClotheType {
  SHIRT = "Shirt",
  PANT = "Pant",
  SOCK = "Sock",
  UNDERWEAR = "Underwear",
}

export interface Clothe {
  id: string; // Random UUID
  name: string;
  type: ClotheType;
  usages: number;
  image?: Blob;
  imageUrl?: string;
}
