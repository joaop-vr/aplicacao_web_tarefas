<template>
  <!-- Botão Voltar para a Home -->
  <div class="ml-8 mb-4 text-left">
    <button
      class="text-white px-4 py-2 rounded"
      style="background-color: #2f4f4f"
      @click="goBackToHome"
      @mouseover="handleMouseOver"
      @mouseout="handleMouseOut"
    >
      Voltar para Home
    </button>
  </div>

  <div class="app-container">
    <div class="row flex-1 flex-col md:flex-row">
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
              @click="handleCreateTask()"
            >
              Criar Tarefa
            </button>
          </div>
          <HorizontalDivider />
          <!-- Campo de entrada e botão de pesquisa -->
          <p>
            Para obter informações mais detalhadas sobre uma tarefa em
            específico, informe os eu ID no campo abaixo.
          </p>
          <input
            type="text"
            v-model="searchTaskId"
            placeholder="Informe o ID"
            class="bg-gray-50 border border-gray-300 px-2 rounded w-full"
          />
          <div class="row mt-4 w-full">
            <button
              class="bg-blue-500 text-white p-2 rounded"
              style="background-color: #556b2f"
              @click="handleSearchTask()"
            >
              Pesquisar
            </button>
          </div>
        </div>
      </div>

      <!-- Modal para criação da tarefa -->
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
      <!-- Modal para exibir detalhes da tarefa -->
      <Modal
        :is-modal-active="isTaskDetailModalActive"
        :heading="`Detalhes da Tarefa`"
        @close-modal="toggleTaskDetailModal"
      >
        <div v-if="selectedTask">
          <p><strong>ID:</strong> {{ selectedTask.taskId }}</p>
          <p><strong>Título:</strong> {{ selectedTask.title }}</p>
          <p><strong>Descrição:</strong> {{ selectedTask.description }}</p>
          <p><strong>Status:</strong> {{ selectedTask.status }}</p>
          <p>
            <strong>Criado em:</strong>
            {{ formatDate(selectedTask.created_at) }}
          </p>
          <p>
            <strong>Atualizado em:</strong>
            {{ formatDate(selectedTask.updated_at) }}
          </p>
        </div>
        <div v-else>
          <p>Task não encontrada.</p>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import {
  STORE,
  loadTasks,
  getTaskById,
  selectedTask,
} from "../stores/kanbanStore";
import ColumnComponent from "../components/Column.vue";
import Modal from "../components/common/Modal.vue";
import TaskForm from "../components/TaskForm.vue";
import VerticalDivider from "../components/VerticalDivider.vue";
import HorizontalDivider from "../components/HorizontalDivider.vue";
import { ACTIONS } from "@/types";

const router = useRouter();
let selectedColumnId = ref("");
const isTaskModalActive = ref(false);
const searchTaskId = ref<string>("");
const isTaskDetailModalActive = ref(false);

onMounted(async () => {
  await loadTasks();
});

// Função para lidar com a busca da tarefa
async function handleSearchTask() {
  if (!searchTaskId.value) {
    alert("Por favor, insira um ID válido.");
    return;
  }

  // Chama a função para buscar o task pelo ID,
  // que será armazenada em "selectedTask"
  await getTaskById(Number(searchTaskId.value));

  // Se a task foi encontrada, abre o modal
  if (selectedTask.value) {
    toggleTaskDetailModal();
  } else {
    alert("Task não encontrada.");
  }
}

// Função para formatar a data no formato "dd/MM/yyyy às HH:mm"
function formatDate(dateString: string): string {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}

// Função para abrir e fechar o modal
function toggleTaskDetailModal() {
  isTaskDetailModalActive.value = !isTaskDetailModalActive.value;
}

// Função para lidar com a criação de tarefa
const handleCreateTask = () => {
  // Selecione a primeira coluna ou qualquer outra lógica para escolher a coluna
  if (STORE.value.length > 0) {
    selectedColumnId.value = STORE.value[0].columnId;
  }
  toggleTaskModal();
};

// Função para abrir e fechar o modal de tarefa
function toggleTaskModal() {
  isTaskModalActive.value = !isTaskModalActive.value;
}

// Função para retornar ao estado principal
function handleBackToMain() {
  isTaskDetailModalActive.value = false; // Fecha o modal
}

// Redireciona para Home.vue
function goBackToHome() {
  router.push({ name: "Home" }); // Nome da rota para Home.vue
}

function handleMouseOver(e: MouseEvent) {
  const target = e.target as HTMLElement | null;
  if (target) {
    target.style.backgroundColor = "#556b2f";
  }
}

function handleMouseOut(e: MouseEvent) {
  const target = e.target as HTMLElement | null;
  if (target) {
    target.style.backgroundColor = "#2F4F4F";
  }
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
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px;
}

.kanban-column {
  flex: 1 1 calc(33.333% - 20px);
  max-width: calc(33.333% - 20px);
  min-width: 250px;
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
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  outline: none;
}

@media (max-width: 768px) {
  .side_content {
    width: 100%;
  }

  .row {
    flex-direction: column;
  }

  .kanban-columns {
    flex-direction: column;
    gap: 10px;
  }

  .kanban-column {
    flex: 1 1 100%;
    max-width: 100%;
  }
}
</style>
