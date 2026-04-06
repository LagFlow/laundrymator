<template>
  <ClotheForm @submit="onSubmit" />
</template>

<script setup>
const store = useClotheStore();
const router = useRouter();

async function onSubmit(data) {
  try {
    await store.createClothe({
      name: data.name,
      type: data.type,
      usages: 0,
      image: data.image,
    });
    router.push("/");
  } catch (error) {
    console.error("Error creating clothe:", error);
  }
}
</script>
