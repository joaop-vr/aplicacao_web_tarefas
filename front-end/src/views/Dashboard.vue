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

  <div class="app-container flex">
    <!-- DataTable ocupa todo o espaço disponível dentro dessa div -->
    <div class="w-full max-w-6xl p-4">
      <div class="flex justify-between mb-4">
        <h1 class="text-xl font-bold">Dashboard</h1>
        <!-- Botão Criar Tarefa -->
        <button
          class="text-white px-4 py-2 rounded"
          style="background-color: #556b2f"
          @click="toggleTaskModal"
        >
          Criar Tarefa
        </button>
      </div>
      <DataTable :tasks="tasks" />
    </div>
  </div>

  <!-- Modal para criação da tarefa -->
  <Modal
    :is-modal-active="isTaskModalActive"
    style="background-color: #556b2f"
    :heading="'Criar Tarefa'"
    @close-modal="toggleTaskModal"
  >
    <TaskForm
      :column-id="defaultColumnId"
      :action="ACTIONS.ADD_TASK"
      @close-modal="toggleTaskModal"
    />
  </Modal>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import DataTable from "../components/DataTable.vue";
import Modal from "../components/common/Modal.vue";
import TaskForm from "../components/TaskForm.vue";
import { fetchTasks, STORE } from "../stores/kanbanStore";
import { ACTIONS } from "../types";
import type { Task } from "../types";

// Router para navegação
const router = useRouter();

// Referências para gerenciamento de estado
const tasks = ref<Array<{ [key: string]: any }>>([]);
const isTaskModalActive = ref(false);
const defaultColumnId = ref<string>("");

// Função para carregar tarefas ao montar o componente
onMounted(async () => {
  if (STORE.value.length > 0) {
    defaultColumnId.value = STORE.value[0].columnId; // Primeiro columnId do STORE
  }
  try {
    const fetchedTasks: Task[] = await fetchTasks();
    // Formatação dos dados para simplificar a estrutura
    tasks.value = fetchedTasks.map((task: any) => ({
      taskId: task.id, // Renomeia o campo 'id' para 'taskId'
      title: task.title,
      description: task.description,
      status: task.status,
    }));
  } catch (error) {
    console.error("Erro ao carregar tarefas:", error);
  }
});

// Função para abrir e fechar o modal de criação de tarefas
function toggleTaskModal() {
  isTaskModalActive.value = !isTaskModalActive.value;
}

// Função para voltar para a Home
function goBackToHome() {
  router.push({ name: "Home" });
}

// Estilização dinâmica dos botões
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
}
</style>
