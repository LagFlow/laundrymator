<template>
  <nav
    class="fixed top-0 shadow-xl w-full bg-gray-200 h-10 grid grid-cols-3 px-3"
  >
    <div class="flex items-center">
      <Icon
        v-if="store.showBackButton"
        name="mdi:arrow-back"
        class="text-3xl"
        @click="router.back()"
      />
      <span v-else></span>
    </div>
    <div class="flex items-center justify-center font-bold text-2xl">
      LaundryMator
    </div>
    <div class="flex items-center justify-self-end">
      <Icon name="mdi:cog" class="text-3xl" @click="isSideMenuVisible = true" />
    </div>
  </nav>
  <SideMenu
    :is-visible="isSideMenuVisible"
    @close="isSideMenuVisible = false"
    @clear-storage="showClearModal"
  />
  <BaseModal :is-open="isClearModalOpen" @close="isClearModalOpen = false">
    <template #header>
      <div>Clear all storage</div>
    </template>
    <div>
      This will clear all your clothes and information from the storage.
    </div>
    <div class="font-bold mt-2">This action cannot be undone!.</div>
    <template #footer>
      <button
        class="bg-red-500 text-white p-2 rounded-md"
        @click="clearStorage"
      >
        Clear
      </button>
    </template>
  </BaseModal>
</template>
<script lang="ts" setup>
const router = useRouter();
const store = useNavbarStore();

const storage = useClotheStore();

const isClearModalOpen = ref(false);
const isSideMenuVisible = ref(false);

function showClearModal() {
  isClearModalOpen.value = true;
}

async function clearStorage() {
  try {
    await storage.clearClotheStore();
  } catch (err) {
    alert(err);
  } finally {
    isClearModalOpen.value = false;
  }
}
</script>
