<template>
  <button
    :type="type"
    :disabled="disabled"
    class="rounded-md p-2 text-white hover:bg-opacity-80 transition-all"
    :class="{
      'bg-blue-500': color === 'primary',
      'bg-green-500': color === 'success',
      'bg-red-500': color === 'danger',
      'bg-yellow-500': color === 'warning',
      'bg-gray-500': color === 'secondary',
      'cursor-not-allowed': disabled,
    }"
    @click="emit('click')"
  >
    <slot></slot>
  </button>
</template>
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    type?: "button" | "submit" | "reset";
    color?: "success" | "primary" | "secondary" | "danger" | "warning";
    disabled?: boolean;
  }>(),
  {
    type: "button",
    color: "primary",
    disabled: false,
  },
);

const emit = defineEmits(["click"]);
</script>
