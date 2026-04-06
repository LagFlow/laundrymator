<template>
  <aside
    v-if="isVisible"
    class="bg-white fixed w-[250px] right-0 top-0 h-screen flex flex-col transition-all duration-100 shadow-lg"
  >
    <div class="grid grid-cols-3">
      <span></span>
      <div class="font-bold">Settings</div>
      <Icon
        name="material-symbols:close"
        @click="emit('close')"
        class="h-full align-middle justify-self-end"
      />
    </div>
    <form @submit="updateClotheSettings">
      <div class="flex flex-col px-2 gap-2 mt-4">
        <label for="freshLimit">Fresh Limit</label>
        <Field
          type="number"
          v-model="clotheStore.freshLimit"
          id="freshLimit"
          name="freshLimit"
          class="border border-gray-500 rounded-md px-2"
          min="1"
        />
        <ErrorMessage name="freshLimit" class="text-red-500 text-sm" />
        <label for="usedLimit">Used Limit</label>
        <Field
          type="number"
          v-model="clotheStore.usedLimit"
          id="usedLimit"
          name="usedLimit"
          class="border border-gray-500 rounded-md px-2"
          min="1"
        />
        <ErrorMessage name="usedLimit" class="text-red-500 text-sm" />
        <label for="washLimit">Wash Limit</label>
        <Field
          type="number"
          v-model="clotheStore.washLimit"
          id="washLimit"
          name="washLimit"
          class="border border-gray-500 rounded-md px-2"
          min="1"
        />
        <ErrorMessage name="washLimit" class="text-red-500 text-sm" />
        <SimpleButton type="submit">Apply</SimpleButton>
      </div>
    </form>
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
      freshLimit: zod.number().min(1, "Fresh limit must be at least 1"),
      usedLimit: zod.number(),
      washLimit: zod.number().max(100, "Wash limit must be at most 100"),
    })
    .refine((data) => data.usedLimit > data.freshLimit, {
      message: "Used limit can't be smaller than fresh limit",
      path: ["usedLimit"],
    })
    .refine((data) => data.washLimit > data.usedLimit, {
      message: "Wash limit can't be smaller than used limit",
      path: ["washLimit"],
    }),
);

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
});

const updateClotheSettings = handleSubmit((values) => {
  clotheStore.freshLimit = values.freshLimit;
  clotheStore.usedLimit = values.usedLimit;
  clotheStore.washLimit = values.washLimit;

  clotheStore.saveClothesSettings();
});
</script>
