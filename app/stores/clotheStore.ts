import type { Clothe } from "~/interfaces/clothe.interface";
import * as db from "~/utils/clothesdb";
import * as settings from "~/utils/settingsdb";

export const useClotheStore = defineStore("clotheStore", {
  state: () => ({
    clothes: [] as Clothe[],
    freshLimit: 2,
    usedLimit: 4,
    washLimit: 5,
  }),

  actions: {
    async createClothe(clothe: Omit<Clothe, "id">) {
      const id = crypto.randomUUID();

      const newClothe = { ...clothe, id } as Clothe;
      await db.createClothe(newClothe);

      this.clothes.push(newClothe);
    },

    async updateClothe(clothe: Clothe): Promise<Clothe> {
      await db.createClothe(clothe);
      const index = this.clothes.findIndex((c) => c.id === clothe.id);
      if (index !== -1) {
        this.clothes[index] = clothe;
      } else {
        this.clothes.push(clothe);
      }
      return clothe;
    },

    async getAllClothes(): Promise<Clothe[]> {
      const clothes = await db.getAllClothes();
      this.clothes = clothes;
      return this.clothes;
    },

    async getClotheById(id: string): Promise<Clothe | undefined> {
      const clothe = await db.getClothe(id);
      return clothe;
    },

    async incrementClotheUsage(id: string): Promise<void> {
      const clothe = await this.getClotheById(id);
      if (clothe) {
        clothe.usages += 1;
        await this.updateClothe(clothe);
      }
    },

    async resetClotheUsage(id: string): Promise<void> {
      const clothe = await this.getClotheById(id);
      if (clothe) {
        clothe.usages = 0;
        await this.updateClothe(clothe);
      }
    },

    async clearClotheStore(): Promise<void> {
      await db.clearStore();
      this.clothes.length = 0;
    },

    loadClothesSettings(): void {
      this.freshLimit = settings.getFreshLimit() ?? 2;
      this.usedLimit = settings.getUsedLimit() ?? 4;
      this.washLimit = settings.getWashLimit() ?? 5;
    },

    saveClothesSettings(): void {
      settings.setFreshLimit(this.freshLimit);
      settings.setUsedLimit(this.usedLimit);
      settings.setWashLimit(this.washLimit);
    },
  },
});
