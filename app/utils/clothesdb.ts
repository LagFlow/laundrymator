import { openDB } from "idb";
import type { Clothe } from "~/interfaces/clothe.interface";

export const dbPromise = openDB("clothes-db", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("clothes")) {
      db.createObjectStore("clothes", { keyPath: "id" });
    }
  },
});

export async function createClothe(clothe: Clothe) {
  const db = await dbPromise;
  let imageUrl: string | undefined;
  if (clothe.image) {
    imageUrl = URL.createObjectURL(clothe.image);
  }
  return db.put("clothes", { ...clothe, imageUrl: imageUrl });
}

export async function getClothe(id: string) {
  const db = await dbPromise;
  return db.get("clothes", id);
}

export async function getAllClothes() {
  const db = await dbPromise;
  return db.getAll("clothes");
}

export async function deleteClothe(id: string) {
  const db = await dbPromise;
  return db.delete("clothes", id);
}

export async function clearStore() {
  const db = await dbPromise;
  await db.clear("clothes");
}
