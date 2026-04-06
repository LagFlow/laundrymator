<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      @click.self="close"
    >
      <div
        class="bg-white rounded-xl shadow-2xl w-full max-w-lg flex flex-col max-h-[90vh] overflow-hidden"
        role="dialog"
      >
        <!-- Header -->
        <header
          v-if="$slots.header"
          class="px-6 py-4 border-b flex items-center justify-between bg-gray-50"
        >
          <div class="text-lg font-bold text-gray-800">
            <slot name="header" />
          </div>
          <Icon
            role="button"
            name="material-symbols:close"
            class="text-gray-400 hover:text-gray-600 transition-colors p-1"
            @click="close"
          />
        </header>

        <!-- Body -->
        <div class="p-6 overflow-y-auto flex-1">
          <slot />
        </div>

        <!-- Footer -->
        <footer
          v-if="$slots.footer"
          class="px-6 py-4 border-t bg-gray-50 flex justify-end gap-3"
        >
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};

// Close on ESC key
const handleEsc = (e) => {
  if (e.key === "Escape" && props.isOpen) {
    close();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleEsc);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleEsc);
});

// Prevent scrolling on body when modal is open
watch(
  () => props.isOpen,
  (val) => {
    if (val) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  },
);
</script>
