<template>
  <div class="bg-white relative border rounded-lg">
    <div class="flex items-center justify-between">
      <!-- Barra de pesquisa -->
      <SearchForm @search="handleSearch" />
      <div class="flex items-center justify-end text-sm font-semibold">
        <!-- Botões de filtro -->
        <FilterButtons @filter="handleFilter" />
      </div>
    </div>
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th class="px-4 py-3">ID</th>
          <th class="px-4 py-3">Título</th>
          <th class="px-4 py-3">Descrição</th>
          <th class="px-4 py-3">Status</th>
          <th class="px-4 py-3">
            <span class="sr-only">Ações</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in filteredTasks" :key="task.taskId">
          <td class="px-4 py-3 font-medium text-gray-900">{{ task.taskId }}</td>
          <td class="px-4 py-3 font-medium text-gray-900">{{ task.title }}</td>
          <td class="px-4 py-3">{{ task.description }}</td>
          <td class="px-4 py-3">{{ task.status }}</td>
          <td class="px-4 py-3 flex items-center justify-end"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import SearchForm from "./SearchForm.vue";

// Alterar para aceitar uma estrutura genérica
const props = defineProps<{
  tasks: Array<{ [key: string]: any }>; // Aceita qualquer chave e valor
}>();

const searchFilter = ref<string>("");
const radioFilter = ref<string>("");

// Função de filtragem
const filteredTasks = computed(() => {
  let tasks = [...(props.tasks || [])];

  if (searchFilter.value) {
    tasks = tasks.filter(
      (task) =>
        task.taskId?.toString().includes(searchFilter.value) ||
        task.title?.toLowerCase().includes(searchFilter.value.toLowerCase()) ||
        task.status?.toLowerCase().includes(searchFilter.value.toLowerCase())
    );
  }

  return tasks;
});

const handleSearch = (search: string) => {
  searchFilter.value = search;
};

const handleFilter = (filter: string) => {
  radioFilter.value = filter;
};
</script>
