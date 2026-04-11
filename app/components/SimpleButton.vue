<template>
  <button
    v-if="!to"
    :type="type"
    :disabled="disabled"
    :class="variant === 'solid' ? solidStyles : ghostStyles"
    @click="emit('click')"
  >
    <slot></slot>
  </button>
  <RouterLink
    v-else
    :to="to!"
    :disabled="disabled"
    :class="variant === 'solid' ? solidStyles : ghostStyles"
  >
    <slot></slot>
  </RouterLink>
</template>
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    type?: "button" | "submit" | "reset";
    color?: "success" | "primary" | "secondary" | "danger" | "warning";
    variant?: "ghost" | "solid";
    disabled?: boolean;
    to?: string;
  }>(),
  {
    type: "button",
    color: "primary",
    disabled: false,
    variant: "solid",
  },
);

const emit = defineEmits(["click"]);

const solidStyles = computed(() => {
  let buttonClasses =
    "rounded-md p-2 text-white hover:bg-opacity-80 transition-all";

  if (props.disabled) {
    buttonClasses += " cursor-not-allowed";
  }

  switch (props.color) {
    case "primary":
      return `${buttonClasses} bg-blue-500`;
    case "success":
      return `${buttonClasses} bg-green-500`;
    case "danger":
      return `${buttonClasses} bg-red-500`;
    case "warning":
      return `${buttonClasses} bg-yellow-500`;
    case "secondary":
      return `${buttonClasses} bg-gray-500`;
    default:
      return `${buttonClasses} bg-blue-500`;
  }
});

const ghostStyles = computed(() => {
  let buttonClasses =
    "rounded-md p-2 transition-all bg-transparent hover:text-white";

  if (props.disabled) {
    buttonClasses += " cursor-not-allowed";
  }

  switch (props.color) {
    case "primary":
      return `${buttonClasses} text-blue-500 hover:bg-blue-300`;
    case "success":
      return `${buttonClasses} text-green-500 hover:bg-green-300`;
    case "danger":
      return `${buttonClasses} text-red-500 hover:bg-red-300`;
    case "warning":
      return `${buttonClasses} text-yellow-500 hover:bg-yellow-300`;
    case "secondary":
      return `${buttonClasses} text-gray-500 hover:bg-gray-300`;
    default:
      return `${buttonClasses} text-blue-500 hover:bg-blue-300`;
  }
});
</script>
