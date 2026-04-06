export enum ClotheType {
  SHIRT = "shirt",
  PANT = "pant",
  SOCK = "sock",
  UNDERWEAR = "underwear",
}

export interface Clothe {
  id: string; // Random UUID
  name: string;
  type: ClotheType;
  usages: number;
  image?: Blob;
  imageUrl?: string;
}
