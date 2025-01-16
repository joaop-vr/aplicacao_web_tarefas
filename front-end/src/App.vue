<script setup lang="ts">
import { onMounted, ref } from "vue";
import Navbar from "./components/Navbar.vue";
import ColumnComponent from "./components/Column.vue";
import { loadTasks } from "./stores/kanbanStore"; // Função de requisição
import { STORE } from "./stores/kanbanStore"; // Usando o STORE para armazenar as colunas
import type { Column, Task } from "./types";

// Carrega as tarefas ao montar o componente
onMounted(() => {
  loadTasks();
});
</script>

<template>
  <div
    id="app"
    style="background-color: #dcdcdc"
    class="flex flex-col w-full h-full"
  >
    <Navbar />
    <div class="flex-1 flex justify-center gap-12 px-3 overflow-x-auto">
      <!-- Utilizando as colunas do STORE -->
      <ColumnComponent
        v-for="column of STORE"
        :key="column.columnId"
        :column="column"
      />
    </div>
  </div>
</template>

<style>
#app {
  @apply select-none h-screen;
}
</style>
