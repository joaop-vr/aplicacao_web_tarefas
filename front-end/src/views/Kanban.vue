<template>
  <div class="app-container">
    <div class="row flex-1 flex-col md:flex-row">
      <!-- Colunas do Kanban (STORE) -->
      <div
        class="kanban-columns flex flex-wrap justify-start gap-4 px-3 overflow-x-auto w-full"
      >
        <ColumnComponent
          v-for="column of STORE"
          :key="column.columnId"
          :column="column"
          class="kanban-column"
        />
      </div>
      <div class="flex justify-center ml-2 mr-2 h-full hidden md:block">
        <VerticalDivider />
      </div>
      <!-- Lado direito com botões e pesquisa -->
      <div class="side_content flex flex-col p-4 md:w-40 w-full">
        <div class="column">
          <!-- Botão "Criar Tarefa" -->
          <div class="row mb-4 w-full">
            <button
              class="bg-blue-500 text-white p-2 rounded"
              style="background-color: #556b2f"
              @click="handleCreateTask"
            >
              Criar Tarefa
            </button>
          </div>
          <HorizontalDivider />
          <!-- Barra de pesquisa -->
          <SearchForm @search="handleSearch" />
        </div>
      </div>
      <Modal
        :is-modal-active="isTaskModalActive"
        :heading="`Criar Task`"
        @close-modal="toggleTaskModal"
      >
        <TaskForm
          :column-id="selectedColumnId"
          :action="ACTIONS.ADD_TASK"
          @close-modal="toggleTaskModal"
        />
      </Modal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { STORE, loadTasks, fetchTasks } from "../stores/kanbanStore"; // Certifique-se de que o STORE está sendo importado corretamente
import ColumnComponent from "../components/Column.vue"; // Verifique se o caminho está correto
import SearchForm from "../components/SearchForm.vue"; // Importando o SearchForm
import Modal from "../components/common/Modal.vue";
import TaskForm from "../components/TaskForm.vue"; // Importando o TaskForm
import VerticalDivider from "../components/VerticalDivider.vue";
import HorizontalDivider from "../components/HorizontalDivider.vue";
import { ACTIONS } from "@/types";

let selectedColumnId = ref("");
const isTaskModalActive = ref(false);

onMounted(async () => {
  await loadTasks(); // Certifique-se de que essa função está atualizando o STORE corretamente
  console.log(STORE); // Verifique o que está sendo impresso no console
});

// Função para lidar com a criação de tarefa
const handleCreateTask = () => {
  // Selecione a primeira coluna ou qualquer outra lógica para escolher a coluna
  if (STORE.value.length > 0) {
    selectedColumnId.value = STORE.value[0].columnId;
  }
  toggleTaskModal();
};

// Função para lidar com a pesquisa
const handleSearch = (search: string) => {
  console.log("Pesquisa: ", search);
};

// Função para abrir e fechar o modal de tarefa
function toggleTaskModal() {
  isTaskModalActive.value = !isTaskModalActive.value;
}

// Função de criação de tarefa para as colunas
function addTask(columnId: string) {
  selectedColumnId.value = columnId;
  toggleTaskModal();
}
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

.row {
  display: flex;
  flex: 1;
}

.kanban-columns {
  flex: 1; /* Garantir que a área de Kanban ocupe o restante da largura */
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px;
}

.kanban-column {
  flex: 1 1 calc(33.333% - 20px); /* 3 colunas para telas grandes */
  max-width: calc(33.333% - 20px); /* A largura das colunas será de 1/3 */
  min-width: 250px; /* Largura mínima para as colunas */
}

.side_content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.column {
  display: flex;
  flex-direction: column;
}

button {
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  outline: none;
}

/* Responsividade: Ajusta layout para telas pequenas */
@media (max-width: 768px) {
  .side_content {
    width: 100%; /* Ocupa 100% da largura em telas pequenas */
  }

  .row {
    flex-direction: column; /* Coloca os elementos em coluna em telas pequenas */
  }

  .kanban-columns {
    flex-direction: column; /* Colunas empilhadas em telas pequenas */
    gap: 10px;
  }

  .kanban-column {
    flex: 1 1 100%; /* Colunas ocupando 100% da largura em telas pequenas */
    max-width: 100%; /* As colunas ocupam toda a largura disponível */
  }
}
</style>
