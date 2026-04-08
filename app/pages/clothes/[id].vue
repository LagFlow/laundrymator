<template>
  <div class="container mx-auto bg-white">
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
      <img :src="clothe.imageUrl" class="w-full h-[400px] object-cover" />
      <div class="flex flex-col">
        <div class="flex flex-col p-2">
          <div class="text-lg font-bold">{{ clothe.name }}</div>
          <div class="text-sm font-light">{{ clothe.type }}</div>
        </div>
        <div class="flex flex-col px-2 gap-2">
          <div class="mt-2">Usages: {{ clothe.usages }}</div>
          <div class="text-sm font-light">{{ statusMessage }}</div>
          <div class="flex justify-around">
            <SimpleButton color="primary" @click="addUsage">
              <Icon name="mdi:add" />
            </SimpleButton>
            <SimpleButton color="warning" @click="resetUsage">
              <Icon name="mdi:reload" />
            </SimpleButton>
          </div>
          <RouterLink :to="`/clothes/edit/${id}`"
            >Update information</RouterLink
          >
          <SimpleButton color="danger">Delete</SimpleButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const store = useClotheStore();

const id = route.params.id;
const clothe = ref(null);
const isLoading = ref(true);

const statusMessage = computed(() => {
  if (clothe.value) {
    if (clothe.value.usages === 0) {
      return "Pristine!";
    }
    if (clothe.value.usages <= store.freshLimit) {
      return "Still pretty clean";
    }
    if (clothe.value.usages <= store.usedLimit) {
      return "It can hold a little bit more...";
    }
    if (clothe.value.usages >= store.washLimit) {
      return "It's time to wash it!";
    }
  }
});

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
