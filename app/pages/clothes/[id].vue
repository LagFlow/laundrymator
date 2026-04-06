<template>
  <div>
    <div v-if="isLoading" class="p-8 text-center">Loading...</div>
    <div v-else-if="!clothe" class="p-8 text-center text-red-500 font-bold">
      Clothe not found
      <div class="mt-4">
        <NuxtLink to="/" class="text-blue-500 hover:underline"
          >Return to wardrobe</NuxtLink
        >
      </div>
    </div>
    <div v-else class="flex flex-col">
      <div>{{ clothe.name }}</div>
      <div>{{ clothe.type }}</div>
      <img :src="clothe.imageUrl" />
      <div>Usages: {{ clothe.usages }}</div>
      <button type="button" @click="addUsage">Add usage</button>
      <button type="button" @click="resetUsage">Reset usage</button>
      <RouterLink :to="`/clothes/edit/${id}`">Update information</RouterLink>
      <button type="button">Delete</button>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const store = useClotheStore();

const id = route.params.id;
const clothe = ref(null);
const isLoading = ref(true);

async function addUsage() {
  try {
    await store.incrementClotheUsage(id);
    clothe.value = await store.getClotheById(id);
  } catch (err) {
    alert(err);
  }
}

async function resetUsage() {
  try {
    await store.resetClotheUsage(id);
    clothe.value = await store.getClotheById(id);
  } catch (err) {
    alert(err);
  }
}

onMounted(async () => {
  try {
    const data = await store.getClotheById(id);
    if (data) {
      clothe.value = data;
    }
  } catch (error) {
    console.error("Error fetching clothe:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>
