<template>
  <form>
    <label class="sr-only">Pesquisar</label>
    <div>
      <input
        type="text"
        @input="onInput"
        placeholder="Filtrar por Título ou id"
        class="bg-gray-50 border border-gray-300 px-2"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (event: "search", value: string): void;
}>();

const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit("search", target.value);
};
</script>
