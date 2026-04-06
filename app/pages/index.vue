<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div v-if="clothes?.length > 0" class="flex flex-col gap-4 p-4">
        <h1 class="text-2xl font-bold">Your Wardrobe</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ClotheItem
            v-for="clothe in clothes"
            :key="clothe.id"
            :clothe="clothe"
            @click="handleClotheClick(clothe)"
          />
        </div>
        <div class="mt-4">
          <NuxtLink
            to="/clothes/create"
            class="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition-colors"
          >
            Add new clothe
          </NuxtLink>
        </div>
      </div>
      <div
        class="bg-red-500 h-screen flex flex-col gap-4 p-8 items-center justify-center text-center"
        v-else
      >
        <div>
          Manage all you clothes, and keep track of how many times have you used
          each one, and when is time to wash it again.
        </div>
        <NuxtLink
          to="/clothes/create"
          class="bg-gray-700 text-white rounded-xl p-2"
        >
          Create my first clothe!
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Clothe } from "~/interfaces/clothe.interface";

const clotheStore = useClotheStore();
const router = useRouter();

const clothes = ref<Clothe[]>([]);
const isLoading = ref(false);

function handleClotheClick(clothe: Clothe) {
  router.push(`/clothes/${clothe.id}`);
}

onMounted(async () => {
  try {
    isLoading.value = true;
    clothes.value = await clotheStore.getAllClothes();
  } catch (err) {
    console.error(err);
  } finally {
    isLoading.value = false;
  }
});
</script>
