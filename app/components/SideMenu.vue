<template>
  <aside
    v-if="isVisible"
    class="bg-white fixed w-[250px] right-0 h-screen flex flex-col gap-4 transition-all duration-100 shadow-lg"
  >
    <div class="grid grid-cols-3 p-2">
      <div class="col-span-2 justify-self-end font-bold">Settings</div>
      <div class="justify-self-end">
        <Icon name="material-symbols:close" @click="emit('close')" />
      </div>
    </div>
    <Form @submit="updateClotheSettings">
      <div class="flex flex-col p-2 gap-1">
        <label for="refresh-limit">Refresh Limit</label>
        <Field
          type="number"
          v-model="clotheStore.freshLimit"
          name="fresh-limit"
          class="border border-gray-500 rounded-md px-2"
          min="1"
        />
        <label for="used-limit">Used Limit</label>
        <Field
          type="number"
          v-model="clotheStore.usedLimit"
          name="used-limit"
          class="border border-gray-500 rounded-md px-2"
          min="1"
        />
        <label for="wash-limit">Wash Limit</label>
        <Field
          type="number"
          v-model="clotheStore.washLimit"
          name="wash-limit"
          class="border border-gray-500 rounded-md px-2"
          min="1"
        />
        <button type="submit">Apply</button>
      </div>
    </Form>
    <hr class="mt-auto" />
    <div
      class="flex items-center gap-2 hover:bg-gray-200 p-2"
      @click="emit('clearStorage')"
    >
      <Icon name="material-symbols:refresh" class="text-xl" />
      <span>Clear all storage</span>
    </div>
  </aside>
</template>
<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";

const props = defineProps<{
  isVisible: boolean;
}>();

const clotheStore = useClotheStore();

const emit = defineEmits(["close", "clearStorage"]);

const schema = toTypedSchema(
  zod
    .object({
      freshLimit: zod.number().min(1),
      usedLimit: zod.number(),
      washLimit: zod.number().max(100),
    })
    .refine((data) => data.usedLimit <= data.freshLimit, {
      message: "",
    }),
);

function updateClotheSettings() {
  alert("update");
}
</script>
