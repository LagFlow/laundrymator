import { openDB } from "idb";
import type { Clothe } from "~/interfaces/clothe.interface";

export const dbPromise = openDB("clothes-db", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("clothes")) {
      db.createObjectStore("clothes", { keyPath: "id" });
    }
  },
});

function withFreshImageUrl(clothe: Clothe): Clothe {
  if (clothe.image instanceof Blob) {
    return { ...clothe, imageUrl: URL.createObjectURL(clothe.image) };
  }
  return { ...clothe, imageUrl: undefined };
}

export async function createClothe(clothe: Clothe) {
  const db = await dbPromise;
  // Store the record without imageUrl — it is ephemeral and must be
  // regenerated from the Blob on every read.
  const { imageUrl: _discarded, ...record } = clothe;
  return db.put("clothes", record);
}

export async function getClothe(id: string): Promise<Clothe | undefined> {
  const db = await dbPromise;
  const record = await db.get("clothes", id);
  if (!record) return undefined;
  return withFreshImageUrl(record);
}

export async function getAllClothes(): Promise<Clothe[]> {
  const db = await dbPromise;
  const records = await db.getAll("clothes");
  return records.map(withFreshImageUrl);
}

export async function deleteClothe(id: string) {
  const db = await dbPromise;
  return db.delete("clothes", id);
}

export async function clearStore() {
  const db = await dbPromise;
  await db.clear("clothes");
}
