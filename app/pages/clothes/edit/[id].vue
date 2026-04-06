<template>
  <div>
    <div v-if="isLoading" class="p-8 text-center">Loading...</div>
    <div v-else-if="!clothe" class="p-8 text-center text-red-500 font-bold">
      Clothe not found
      <div class="mt-4">
        <NuxtLink to="/" class="text-blue-500 hover:underline">
          Return to wardrobe
        </NuxtLink>
      </div>
    </div>
    <div v-else>
      <ClotheForm
        :initial-data="clothe"
        :is-edit-mode="true"
        @submit="onSubmit"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Clothe } from "~/interfaces/clothe.interface";

const route = useRoute();
const router = useRouter();
const store = useClotheStore();

const id = route.params.id;
const clothe = ref<Clothe | null>(null);
const isLoading = ref(true);

onMounted(async () => {
  try {
    const data = await store.getClotheById(id as string);
    if (data) {
      clothe.value = data;
    }
  } catch (error) {
    console.error("Error fetching clothe:", error);
  } finally {
    isLoading.value = false;
  }
});

async function onSubmit(updatedData: Clothe) {
  try {
    await store.updateClothe({
      ...updatedData,
      id: id as string,
    });
    router.push("/");
  } catch (error) {
    console.error("Error updating clothe:", error);
  }
}
</script>
