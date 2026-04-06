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
    <div class="flex flex-col gap-1">
      <div class="text-lg font-medium">{{ clothe.name }}</div>
      <div class="text-sm text-gray-600">{{ clothe.type }}</div>
      <div>
        <span
          class="rounded-full px-2 text-white text-sm"
          :class="{
            'bg-green-500': clothe.usages <= clotheStore.freshLimit,
            'bg-yellow-500':
              clothe.usages >= clotheStore.usedLimit &&
              clothe.usages <= clotheStore.washLimit,
            'bg-red-500': clothe.usages > clotheStore.washLimit,
          }"
        >
          Usages: {{ clothe.usages }}
        </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Clothe } from "~/interfaces/clothe.interface";

const clotheStore = useClotheStore();

const props = defineProps<{
  clothe: Clothe;
}>();
</script>
