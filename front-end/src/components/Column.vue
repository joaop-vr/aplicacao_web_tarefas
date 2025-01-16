<template>
  <DropZone @drop-data="onDrop">
    <!-- Componente Column propriamente-->
    <Draggable
      :transfer-data="{
        columnId: column.columnId,
        type: TYPES.COLUMN,
      }"
      class="p-2 w-64 bg-gray-100 shadow-lg shadow-slate-800 rounded"
    >
      <div class="flex justify-center items-center">
        <div class="flex gap-2 items-center">
          <span
            class="flex justify-center text-xl font-semibold overflow-x-auto w-40 py-1"
          >
            {{ column.name }}
          </span>
        </div>
      </div>
      <div class="flex flex-col gap-2 overflow-y-auto h-[35rem] p-2">
        <Task
          v-for="task of column.tasks"
          :column-id="column.columnId"
          :task="task"
          :key="task.taskId"
        />
      </div>
    </Draggable>
  </DropZone>

  <!-- Modal para atualizar coluna -->
  <Modal
    :is-modal-active="isUpdateColumnModalActive"
    :heading="`${ACTIONS.UPDATE_COLUMN.split('_').join(' ')}`"
    @close-modal="toggleUpdateColumnModal()"
  >
    <ColumnForm
      :action="ACTIONS.UPDATE_COLUMN"
      :column="column"
      @close-modal="toggleUpdateColumnModal()"
    />
  </Modal>

  <!-- Modal para deletar coluna -->
  <Modal
    :is-modal-active="isDeleteColumnModalActive"
    :heading="`Deletar Tarefa`"
    @close-modal="toggleDeleteColumnModal"
  >
    <div class="p-2">
      <span>Tem certeza que deseja deletar {{ column && column.name }}?</span>
      <div class="flex justify-around pt-3">
        <button @click="toggleDeleteColumnModal()">Não</button>
        <button @click="deleteColumn">Sim</button>
      </div>
    </div>
  </Modal>

  <Modal
    :is-modal-active="isTaskModalActive"
    :heading="`Criar Task`"
    @close-modal="toggleTaskModal()"
  >
    <TaskForm
      :column-id="selectedColumnId"
      :action="ACTIONS.ADD_TASK"
      @close-modal="toggleTaskModal()"
    />
  </Modal>
</template>
<script setup lang="ts">
import { ACTIONS, TYPES, type TRANSFER_DATA } from "@/types";
import Draggable from "./common/Draggable.vue";
import DropZone from "./common/DropZone.vue";
import { ref } from "vue";
import ColumnForm from "./ColumnForm.vue";
import TaskForm from "./TaskForm.vue";
import Modal from "./common/Modal.vue";
import kanbanStore from "@/stores/kanbanStore";
import Task from "./Task.vue";

export type Column = {
  columnId: string;
  name: string;
  tasks: Array<any>;
};

const props = defineProps<{
  column: Column;
}>();

const isUpdateColumnModalActive = ref(false);
const isDeleteColumnModalActive = ref(false);
const selectedColumn = ref<Column | null>(null);

function onDrop(transferData: TRANSFER_DATA) {
  if (transferData.type === TYPES.COLUMN && transferData.columnId) {
    kanbanStore.moveColumn(transferData.columnId, props.column.columnId);
  } else if (transferData.type === TYPES.TASK && transferData.taskId) {
    kanbanStore.moveTask(transferData.taskId, props.column.columnId!);
  }
}

function setSelectedColumn(action: ACTIONS, column: Column) {
  selectedColumn.value = column;
  if (action === ACTIONS.UPDATE_COLUMN) {
    toggleUpdateColumnModal();
  } else if (action === ACTIONS.DELETE_COLUMN) {
    toggleDeleteColumnModal();
  }
}

function deleteColumn() {
  if (selectedColumn.value) {
    kanbanStore.deleteColumn(selectedColumn.value?.columnId);
  }
}

function toggleUpdateColumnModal() {
  isUpdateColumnModalActive.value = !isUpdateColumnModalActive.value;
}

function toggleDeleteColumnModal() {
  isDeleteColumnModalActive.value = !isDeleteColumnModalActive.value;
}

let selectedColumnId = ref("");
const isTaskModalActive = ref(false);

function addTask(columnId: Column["columnId"]) {
  selectedColumnId.value = columnId;
  toggleTaskModal();
}

function toggleTaskModal() {
  isTaskModalActive.value = !isTaskModalActive.value;
}
</script>

<style scoped>
.rounded {
  border-radius: 1.25rem;
}
</style>
