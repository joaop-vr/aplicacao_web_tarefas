<template>
  <form class="flex items-center space-x-3 bg-white shadow-sm p-2 rounded-lg">
    <!-- Ícone de busca -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5 text-gray-400"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1111.25 3.01l4.42 4.42a1 1 0 01-1.42 1.42l-4.42-4.42A6 6 0 012 8z"
        clip-rule="evenodd"
      />
    </svg>
    <!-- Campo de entrada -->
    <input
      type="text"
      @input="onInput"
      placeholder="Pesquisar por ID"
      class="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
    />
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
