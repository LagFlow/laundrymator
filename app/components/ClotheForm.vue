<template>
  <Form @submit="onSubmit" class="flex flex-col gap-4 p-4 max-w-md mx-auto">
    <div class="flex flex-col gap-1">
      <label for="clothe-name" class="font-semibold text-gray-700"> Clothe name: </label>
      <Field
        id="clothe-name"
        name="name"
        type="text"
        :rules="isRequired"
        v-model="clotheData.name"
        class="border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
        placeholder="e.g. Red T-shirt"
      />
      <ErrorMessage name="name" class="text-red-500 text-sm" />
    </div>

    <div class="flex flex-col gap-1">
      <label for="clothe-type" class="font-semibold text-gray-700"> Clothe type: </label>
      <Field
        id="clothe-type"
        name="type"
        as="select"
        :rules="isRequired"
        v-model="clotheData.type"
        class="border rounded p-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
      >
        <option value="" disabled>Select a type</option>
        <option
          v-for="type in Object.values(ClotheType)"
          :key="type"
          :value="type"
        >
          {{ type }}
        </option>
      </Field>
      <ErrorMessage name="type" class="text-red-500 text-sm" />
    </div>

    <div class="flex flex-col gap-1">
      <label for="clothe-picture" class="font-semibold text-gray-700">Clothe picture:</label>
      <div v-if="previewUrl" class="mb-2 w-full h-48 bg-gray-100 rounded overflow-hidden flex items-center justify-center relative group">
        <img :src="previewUrl" alt="Preview" class="object-contain max-h-full" />
        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
          <button type="button" @click="triggerFileInput" class="bg-white text-gray-800 px-3 py-1 rounded text-sm font-medium">
            Change Image
          </button>
        </div>
      </div>
      <input
        id="clothe-picture"
        ref="fileInput"
        type="file"
        accept="image/png,image/jpg,image/jpeg"
        class="border rounded p-2"
        @change="onFileChange"
      />
    </div>

    <button
      type="submit"
      :disabled="isSubmitting"
      class="bg-blue-600 text-white rounded p-3 mt-4 hover:bg-blue-700 transition-colors font-bold shadow-md disabled:opacity-50"
    >
      {{ isEditMode ? 'Update Clothe' : 'Create Clothe' }}
    </button>

    <NuxtLink
      to="/"
      class="text-blue-500 hover:underline text-center text-sm"
    >
      Cancel and back
    </NuxtLink>
  </Form>
</template>

<script setup>
import { ClotheType } from "~/interfaces/clothe.interface";

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({
      name: "",
      type: "",
      usages: 0,
      image: null,
    }),
  },
  isEditMode: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["submit"]);

const clotheData = reactive({ ...props.initialData });
const isSubmitting = ref(false);
const fileInput = ref(null);
const selectedFile = ref(null);
const previewUrl = ref(null);

watch(() => props.initialData, (newData) => {
  Object.assign(clotheData, newData);
  if (newData.image instanceof Blob) {
    previewUrl.value = URL.createObjectURL(newData.image);
  }
}, { immediate: true });

function isRequired(value) {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return "This field is required";
  }
  return true;
}

function triggerFileInput() {
  fileInput.value?.click();
}

function onFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    previewUrl.value = URL.createObjectURL(file);
  }
}

async function onSubmit(values) {
  isSubmitting.value = true;
  try {
    const dataToSubmit = {
      ...clotheData,
      ...values,
      image: selectedFile.value || clotheData.image,
    };
    emit("submit", dataToSubmit);
  } finally {
    isSubmitting.value = false;
  }
}
</script>
