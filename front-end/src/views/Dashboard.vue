<template>
  <div class="app-container">
    <Navbar />
    <p>BBBBBBBBBBBb</p>
    <div class="flex-1 flex justify-center gap-12 px-3 overflow-x-auto">
      <ColumnComponent
        v-for="column of STORE"
        :key="column.columnId"
        :column="column"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Navbar from "../components/Navbar.vue";
import { STORE, loadTasks, fetchTasks } from "../stores/kanbanStore";
import type { Task } from "../types";

const tasks = ref<Task[]>([]);

onMounted(async () => {
  await loadTasks();
  tasks.value = await fetchTasks();
});
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

.app-container {
  width: 100%;
  height: 100vh;
  background-color: #dcdcdc;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center; /* Centraliza horizontalmente */
  justify-content: center; /* Centraliza verticalmente */
  flex: 1; /* Ocupa o espaço disponível */
  text-align: center; /* Centraliza texto */
}
</style>
