<template>
  <div class="flex flex-col h-screen">
    <HeaderBar />
    <NuxtPage />
  </div>
</template>
<script lang="ts" setup>
const clotheStore = useClotheStore();

onMounted(() => {
  // We load the clothes settings from the local storage
  clotheStore.loadClothesSettings();
});
</script>
