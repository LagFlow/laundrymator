<template>
  <div class="flex flex-col h-screen pt-10 bg-gray-50 overflow-hidden">
    <HeaderBar />
    <NuxtPage class="overflow-auto" @back="back" />
  </div>
</template>
<script lang="ts" setup>
const clotheStore = useClotheStore();

function back() {
  alert("back!");
}

onMounted(() => {
  // We load the clothes settings from the local storage
  clotheStore.loadClothesSettings();
});
</script>
