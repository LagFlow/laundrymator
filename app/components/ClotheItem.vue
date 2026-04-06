<template>
  <div
    class="border rounded-lg p-4 shadow-sm flex flex-col gap-2 hover:cursor-pointer"
  >
    <div
      v-if="clothe.imageUrl"
      class="w-full h-48 bg-gray-100 rounded overflow-hidden flex items-center justify-center"
    >
      <img
        :src="clothe.imageUrl"
        :alt="clothe.name"
        class="object-contain max-h-full"
      />
    </div>
    <div
      v-else
      class="w-full h-48 bg-gray-100 rounded overflow-hidden flex items-center justify-center"
    >
      <span class="text-gray-500">No image</span>
    </div>
    <div>
      <h3 class="text-lg font-medium">{{ clothe.name }}</h3>
      <p class="text-sm text-gray-600">{{ clothe.type }}</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Clothe } from "~/interfaces/clothe.interface";

const props = defineProps<{
  clothe: Clothe;
}>();
</script>
